import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TelegrafService } from "./telegraf.service";
import { TelegramController } from "./telegram.controller";
import { TelegramService } from "./telegram.service";
import { SubscriptionService } from "src/subscription/subscription.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { WizardService } from "./wizard.service";
import { RegistrationService } from "./registration.service";

@Module({
  imports: [ConfigModule],
  providers: [
    TelegrafService,
    TelegramService,
    SubscriptionService,
    PrismaService,
    UserService,
    WizardService,
    RegistrationService,
  ],
  controllers: [TelegramController],
})
export class TelegramModule {}
