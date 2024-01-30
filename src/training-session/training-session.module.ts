import { Module } from "@nestjs/common";
import { TrainingSessionService } from "./training-session.service";
import { TrainingSessionResolver } from "./training-session.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [TrainingSessionService, TrainingSessionResolver, PrismaService],
})
export class TrainingSessionModule {}
