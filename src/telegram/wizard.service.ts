import { Injectable } from "@nestjs/common";
import { Markup, Scenes } from "telegraf";
import { TelegramService } from "./telegram.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class WizardService {
  stage: Scenes.Stage<
    Scenes.WizardContext<Scenes.WizardSessionData>,
    Scenes.SceneSessionData
  >;
  constructor(
    private readonly telegramService: TelegramService,
    private readonly userService: UserService,
    ) {
    let user = new Object();

    const registerWizard = new Scenes.WizardScene(
      "register-wizard",
      async (ctx) => {
        await ctx.reply(
          "Добавьте свой номер телефона.\n(кнопка внизу)",
          Markup.keyboard([
            Markup.button.contactRequest("Ввести номер телефона"),
          ]).resize(),
        );
        return ctx.wizard.next();
      },
      async (ctx: any) => {
        if (!!ctx.message.contact.phone_number) {
          user["phone_number"] = ctx.message.contact.phone_number;
        }
        await ctx.reply("Как к вам обращаться?");
        return ctx.wizard.next();
      },
      async (ctx) => {
        if (!!ctx.message.text && this.isValidFullName(ctx.message.text)) {
          user["full_name"] = ctx.message.text;
          await ctx.reply(`${ctx.message.text}, приятно познакомиться.`);
        } else {
          await ctx.reply("Пожалуйста, введите корректное имя и фамилию.");
          return;
        }
        await ctx.reply(
          `Если хотите, введите свою дату рождения.
           Введите 3 цифры: год, месяц, день.
           Пример: 1998 09 28`,
        );
        return ctx.wizard.next();
      },
      async (ctx) => {
        if (!!ctx.message.text && this.isValidDateString(ctx.message.text)) {
          user["birth_date"] = new Date(ctx.message.text.replace(" ", "-"));
        } else {
          await ctx.reply("Пожалуйста, введите корректую дату рождения.");
          return;
        }
        await ctx.reply("Если хотите, введите свой рост (см).");
        return ctx.wizard.next();
      },
      async (ctx) => {
        if (
          !!Number(ctx.message.text) &&
          Number(ctx.message.text) > 100 &&
          Number(ctx.message.text) < 220
        ) {
          user["height"] = Number(ctx.message.text);
        } else {
          await ctx.reply("Пожалуйста, введите корректый рост.");
          return;
        }
        await ctx.reply("Если хотите, введите свой вес (кг).");
        return ctx.wizard.next();
      },
      async (ctx) => {
        if (
          !!Number(ctx.message.text) &&
          Number(ctx.message.text) > 35 &&
          Number(ctx.message.text) < 250
        ) {
          user["weight"] = Number(ctx.message.text);
        } else {
          await ctx.reply("Пожалуйста, введите корректый вес.");
        }
        user["telegram_id"] = ctx.from.id;
        user["username"] = ctx.from.username;
        user["is_admin"] = false;

        await this.userService.create(user);

        await this.telegramService.start(ctx);
        return await ctx.scene.leave();
      },
    );

    this.stage = new Scenes.Stage<Scenes.WizardContext>([registerWizard], {});
  }

  public getStage() {
    return this.stage;
  }

  private isValidDateString(dateString) {
    const dateObject = new Date(dateString);
    return !isNaN(dateObject.getTime());
  }

  private isValidFullName(name: string): boolean {
    const words = name.split(/\s+/);
    return words.length >= 2;
  }
}
