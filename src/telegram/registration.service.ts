import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { Markup } from "telegraf";
import { TelegramService } from "./telegram.service";
import { CommonService } from "src/common/common.service";
import { RegUserData } from "./reg-user-data.interface";

@Injectable()
export class RegistrationService {
  private user: RegUserData;

  constructor(
    private readonly telegramService: TelegramService,
    private readonly userService: UserService,
    private readonly commonService: CommonService,
  ) {}

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
    const phoneNumber =
      ctx.message.contact.phone_number ||
      this.commonService.isValidUkrainianPhoneNumber(ctx.message.text)
        ? ctx.message.text
        : null;

    if (!phoneNumber) {
      await ctx.reply("Введите корректный номер телефона.");
      return;
    }

    this.user.phone_number = phoneNumber;

    await ctx.reply("Как к вам обращаться?");
    return ctx.wizard.next();
  };

  wizard_birth_date = async (ctx) => {
    const fullName = ctx.message.text;

    if (!fullName || !this.commonService.isValidFullName(fullName)) {
      await ctx.reply("Пожалуйста, введите корректное имя и фамилию.");
      return;
    }

    this.user.full_name = fullName;

    const dateString = ctx.message.text.replace(" ", "-");
    this.user.birth_date =
      dateString && this.commonService.isValidDateString(dateString)
        ? new Date(dateString)
        : null;

    await ctx.reply(
      `Если хотите, введите свою дату рождения.
           Введите 3 цифры: год, месяц, день или -, если не считаете нужным.
           Пример: 1998 09 28`,
    );
    return ctx.wizard.next();
  };

  wizard_height = async (ctx) => {
    const height = ctx.message.text;
    this.user.birth_date =
      height && this.commonService.isValidDateString(height)
        ? Number(height)
        : height === "-"
        ? null
        : this.user.birth_date;

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

    await ctx.reply(
      "Если хотите, введите свой вес (кг) или -, если не считаете нужным.",
    );
    return ctx.wizard.next();
  };

  wizard_end = async (ctx) => {
    const weight = ctx.message.text;
    this.user["weight"] =
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

    this.user.telegram_id = ctx.from.id;
    this.user.username = ctx.from.username;
    this.user.is_admin = false;

    await this.userService.create(this.user);

    await this.telegramService.start(ctx);
    return await ctx.scene.leave();
  };
}
