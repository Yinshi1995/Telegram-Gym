import { Controller, Get } from "@nestjs/common";
import { session } from "telegraf";
import { TelegrafService } from "./telegraf.service";
import { TelegramService } from "./telegram.service";
import { WizardService } from "./wizard.service";

@Controller()
export class TelegramController {
  constructor(
    private readonly telegrafService: TelegrafService,
    private readonly telegramService: TelegramService,
    private readonly wizardService: WizardService,
  ) {}

  @Get("webhook")
  setWebhook() {
    const bot = this.telegrafService.getBot();

    bot.start(this.telegramService.start);

    bot.use(session());
    bot.use(this.wizardService.stage.middleware());

    bot.action("register_yes", this.telegramService.register_yes);
    bot.action("register_no", this.telegramService.register_no);

    bot.launch();

    return "Webhook установлен";
  }
}
