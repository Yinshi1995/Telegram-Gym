import { Injectable } from "@nestjs/common";
import { SubscriptionService } from "src/subscription/subscription.service";
import { UserService } from "src/user/user.service";
import { Markup, Context } from "telegraf";
import { WizardService } from "./wizard.service";

@Injectable()
export class TelegramService {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly userService: UserService,
  ) {}

  start = async (ctx: Context) => {
    const url: string = "https://angular-telegram-bot.vercel.app/";
    let userId = ctx.message.from.id;
    let webAppUrlWithUserId = `${url}qrcode?user_id=${userId}`;

    let userExists: boolean = await this.userService.userExists(userId);

    if (!userExists) {
      this.register_request(ctx);
      return;
    }

    let subscribed: boolean =
      await this.subscriptionService.hasActiveSubscription(userId);

    ctx.reply(
      `Добро пожаловать! Выберите нужный раздел:`,
      Markup.keyboard([
        [
          Markup.button.webApp("QR код", webAppUrlWithUserId),
          Markup.button.webApp("Абонемент", url),
        ],
        [
          Markup.button.webApp("Статистика по посещениям", url), // Добавлено для функционала "Visit Intensity Statistics"
          Markup.button.webApp("Программа тренировок", url), // Добавлено для функционала "Workout Program Section"
        ],
        [
          Markup.button.webApp("История тренировок", url), // Добавлено для функционала "Training History"
          Markup.button.webApp("Отслеживание калорий", url), // Добавлено для функционала "Calorie Tracking"
        ],
      ]).resize(),
    );
  };

  register_yes = async (ctx: any) => {
    ctx.deleteMessage();
    await ctx.answerCbQuery();
    await ctx.scene.enter("register-wizard");
  };

  register_no = async (ctx: Context) => {
    ctx.deleteMessage();
    await ctx.answerCbQuery();
    await ctx.reply(
      "Ок, если вы передумаете, всегда можете зарегистрироваться позже.",
      Markup.inlineKeyboard([
        Markup.button.callback("Зарегистрироваться", "register_yes"),
      ]),
    );
  };

  private register_request = (ctx: Context) => {
    ctx.reply(
      "Привет! Вы еще не зарегистрированы. Хотите зарегистрироваться?",
      Markup.inlineKeyboard([
        Markup.button.callback("Да", "register_yes"),
        Markup.button.callback("Нет", "register_no"),
      ]),
    );
  };
}
