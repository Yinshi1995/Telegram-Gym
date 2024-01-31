import { Injectable } from "@nestjs/common";
import { Markup } from "telegraf";
import { CommonService } from "src/common/common.service";
import { UserService } from "src/user/user.service";
import { TelegramService } from "./telegram.service";
import { RegUserData } from "./reg-user-data.interface";

@Injectable()
export class RegistrationService {
  private user: RegUserData = new Object() as RegUserData;

  constructor(
    private readonly telegramService: TelegramService,
    private readonly userService: UserService,
    private readonly commonService: CommonService,
  ) { }

  wizard_init = async (ctx) => {
    await ctx.reply(
      "Добавьте свой номер телефона.\n(кнопка внизу)",
      Markup.keyboard([
        Markup.button.contactRequest("Ввести номер телефона"),
      ]).resize(),
    );
    return ctx.wizard.next();
  };

  wizard_phone = async (ctx) => {
    if (!ctx.message.contact || !ctx.message.contact.phone_number) {
      await ctx.reply("Введите корректный номер телефона.");
      return;
    }

    const phoneNumber = this.commonService.isValidUkrainianPhoneNumber(
      ctx.message.contact.phone_number,
    ) || null;

    if (!phoneNumber) {
      await ctx.reply("Введите корректный номер телефона.");
      return;
    }

    this.user.phone_number = phoneNumber;

    await ctx.reply("Как к вам обращаться?", Markup.removeKeyboard());
    return ctx.wizard.next();
  };

  wizard_name = async (ctx) => {
    const fullName = ctx.message.text;

    if (!fullName || !this.commonService.isValidFullName(fullName)) {
      await ctx.reply("Пожалуйста, введите корректное имя и фамилию.");
      return;
    }

    this.user.full_name = fullName;

    await ctx.reply(
      `Если хотите, введите свою дату рождения.
           Введите 3 цифры: год, месяц, день или -, если не считаете нужным.
           Пример: 1998 09 28`,
    );
    return ctx.wizard.next();
  };

  wizard_birth_date = async (ctx) => {
    const birthDate = ctx.message.text;

    if (
      birthDate &&
      !this.commonService.isValidDateString(birthDate.replace(/ /g, "-"))
    ) {
      await ctx.reply("Пожалуйста, введите корректную дату рождения.");
      return;
    }

    this.user.birth_date = birthDate
      ? new Date(birthDate.replace(/ /g, "-"))
      : null;

    await ctx.reply(
      "Введите свой рост (в сантиметрах) или -, если не считаете нужным.",
    );
    return ctx.wizard.next();
  };

  wizard_height = async (ctx) => {
    const height = ctx.message.text;
    this.user.height =
      height && this.commonService.isInteger(height)
        ? Number(height)
        : height === "-"
        ? null
        : this.user.height;

    if (
      height &&
      (isNaN(Number(height)) || !(Number(height) > 100 && Number(height) < 220))
    ) {
      await ctx.reply("Пожалуйста, введите корректый рост.");
      return;
    }

    this.user.height = height === "-" ? null : Number(height);

    await ctx.reply(
      "Если хотите, введите свой вес (кг) или -, если не считаете нужным.",
    );
    return ctx.wizard.next();
  };

  wizard_weight = async (ctx) => {
    const weight = ctx.message.text;
    this.user.weight =
      weight &&
      !isNaN(Number(weight)) &&
      Number(weight) > 35 &&
      Number(weight) < 250
        ? Number(weight)
        : weight === "-"
        ? null
        : this.user["weight"];

    if (
      weight &&
      (isNaN(Number(weight)) || !(Number(weight) > 35 && Number(weight) < 250))
    ) {
      await ctx.reply("Пожалуйста, введите корректый вес.");
      return;
    }

    await this.endConnection(ctx);
  };

  private async endConnection(ctx) {
    this.user.telegram_id = ctx.from.id;
    this.user.username = ctx.from.username;
    this.user.is_admin = false;

    await this.userService.create(this.user);

    await this.telegramService.start(ctx);
    return await ctx.scene.leave();
  }
}
