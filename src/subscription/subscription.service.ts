import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

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
}
