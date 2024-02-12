import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

export interface Subscription {
  status: string;
  start_date: string;
  end_date: string;
}


@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async findOne(subscriptionId: number) {
    return this.prisma.subscription.findUnique({
      where: {
        subscription_id: subscriptionId,
      },
    });
  }

  async findOneByUserId(telegramId: number) {
    let user = await this.prisma.user.findUnique({
      where: {
        telegram_id: telegramId,
      },
      include: {
        Subscriptions: true,
      }
    });

    return this.separateSubscriptions(user.Subscriptions);
  }

  async findAll() {
    return this.prisma.subscription.findMany({});
  }

  async create(data: any) {
    return this.prisma.subscription.create({
      data,
    });
  }

  async hasActiveSubscription(userId: number): Promise<boolean> {
    const activeSubscription = await this.prisma.subscription.findFirst({
      where: {
        user_id: userId,
        status: "active",
      },
    });

    return !!activeSubscription;
  }

  private separateSubscriptions(subscriptions: any[]) {
    let active: Subscription | null = null;
    const inactive: Subscription[] = [];

    for (let subscription of subscriptions) {
      if (subscription.status == 'active') {
        active = subscription;
      } else {
        inactive.push(subscription);
      }
    }

    return {
      active,
      inactive,
    };
  }
}
