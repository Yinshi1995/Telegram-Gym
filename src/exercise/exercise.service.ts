import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {}

  async findOne(exerciseId: number) {
    return this.prisma.exercise.findUnique({
      where: {
        exercise_id: exerciseId,
      },
    });
  }

  async findAll() {
    return this.prisma.exercise.findMany({});
  }

  async create(data: any) {
    return this.prisma.exercise.create({
      data,
    });
  }
}
