import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Context, Telegraf } from "telegraf";

@Injectable()
export class TelegrafService {
  private readonly bot: Telegraf;

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.get("TELEGRAM_TOKEN");
    this.bot = new Telegraf(token);
  }

  getBot(): Telegraf {
    return this.bot;
  }
}
