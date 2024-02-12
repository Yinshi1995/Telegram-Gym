import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(telegramId: number) {
    return this.prisma.user.findUnique({
      where: {
        telegram_id: telegramId,
      },
      include: {
        Subscriptions: true,
      }
    });
  }

  async findAll() {
    return this.prisma.user.findMany({});
  }

  async userExists(telegramId: number): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        telegram_id: telegramId,
      },
    });

    return !!user;
  }

  async create(data: any) {
    return this.prisma.user.create({
      data,
    });
  }
}
