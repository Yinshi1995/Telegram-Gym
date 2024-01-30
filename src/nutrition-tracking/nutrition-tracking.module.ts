import { Module } from "@nestjs/common";
import { NutritionTrackingService } from "./nutrition-tracking.service";
import { NutritionTrackingResolver } from "./nutrition-tracking.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [
    NutritionTrackingService,
    NutritionTrackingResolver,
    PrismaService,
  ],
})
export class NutritionTrackingModule {}
