import { Injectable } from "@nestjs/common";
import { SubscriptionService } from "src/subscription/subscription.service";
import { UserService } from "src/user/user.service";
import { Markup, Context } from "telegraf";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TelegramService {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  start = async (ctx: Context) => {
    const url: string = this.configService.get("MINI_APP_URL");
    let userId = ctx.message.from.id;

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
          Markup.button.webApp(
            "QR код (User)",
            `${url}/qrcode?user_id=${userId}`,
          ),
          Markup.button.webApp("Абонемент", url),
        ],
        [
          Markup.button.webApp("QR код scan (Admin)", `${url}/scanner`),
          Markup.button.webApp("Абонемент", url),
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
