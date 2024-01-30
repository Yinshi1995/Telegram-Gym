import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { WorkoutTypeService } from "./workout-type.service";

@Resolver("WorkoutType")
export class WorkoutTypeResolver {
  constructor(private readonly workoutTypeService: WorkoutTypeService) {}

  @Query("workoutType")
  async getWorkoutType(@Args("type_id") typeId: number) {
    return this.workoutTypeService.findOne(typeId);
  }

  @Query("allWorkoutTypes")
  async getAllWorkoutTypes() {
    return this.workoutTypeService.findAll();
  }

  @Mutation("createWorkoutType")
  async createWorkoutType(@Args("input") input: any) {
    return this.workoutTypeService.create(input);
  }
}
