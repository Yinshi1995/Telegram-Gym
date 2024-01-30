import { Module } from "@nestjs/common";
import { ExerciseService } from "./exercise.service";
import { ExerciseResolver } from "./exercise.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [ExerciseService, ExerciseResolver, PrismaService],
})
export class ExerciseModule {}
