import { Module } from "@nestjs/common";
import { WorkoutTypeService } from "./workout-type.service";
import { WorkoutTypeResolver } from "./workout-type.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [WorkoutTypeService, WorkoutTypeResolver, PrismaService],
})
export class WorkoutTypeModule {}
