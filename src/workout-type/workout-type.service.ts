import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class WorkoutTypeService {
  constructor(private prisma: PrismaService) {}

  async findOne(typeId: number) {
    return this.prisma.workoutType.findUnique({
      where: {
        type_id: typeId,
      },
    });
  }

  async findAll() {
    return this.prisma.workoutType.findMany({});
  }

  async create(data: any) {
    return this.prisma.workoutType.create({
      data,
    });
  }
}
