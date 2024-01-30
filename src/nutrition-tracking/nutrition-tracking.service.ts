import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class NutritionTrackingService {
  constructor(private prisma: PrismaService) {}

  async findOne(trackingId: number) {
    return this.prisma.nutritionTracking.findUnique({
      where: {
        tracking_id: trackingId,
      },
    });
  }

  async findAll() {
    return this.prisma.nutritionTracking.findMany({});
  }

  async create(data: any) {
    return this.prisma.nutritionTracking.create({
      data,
    });
  }
}
