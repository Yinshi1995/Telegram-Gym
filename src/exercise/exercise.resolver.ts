import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { ExerciseService } from "./exercise.service";

@Resolver("Exercise")
export class ExerciseResolver {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Query("exercise")
  async getExercise(@Args("exercise_id") exerciseId: number) {
    return this.exerciseService.findOne(exerciseId);
  }

  @Query("allExercises")
  async getAllExercises() {
    return this.exerciseService.findAll();
  }

  @Mutation("createExercise")
  async createExercise(@Args("input") input: any) {
    return this.exerciseService.create(input);
  }
}
