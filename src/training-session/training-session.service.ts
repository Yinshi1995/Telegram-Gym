import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TrainingSessionService {
  constructor(private prisma: PrismaService) {}

  async findOne(sessionId: number) {
    return this.prisma.trainingSession.findUnique({
      where: {
        session_id: sessionId,
      },
    });
  }

  async findAll() {
    return this.prisma.trainingSession.findMany({});
  }

  async create(data: any) {
    return this.prisma.trainingSession.create({
      data,
    });
  }
}
