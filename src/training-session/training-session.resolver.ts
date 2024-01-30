import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { TrainingSessionService } from "./training-session.service";

@Resolver("TrainingSession")
export class TrainingSessionResolver {
  constructor(
    private readonly trainingSessionService: TrainingSessionService,
  ) {}

  @Query("trainingSession")
  async getTrainingSession(@Args("session_id") sessionId: number) {
    return this.trainingSessionService.findOne(sessionId);
  }

  @Query("allTrainingSessions")
  async getAllTrainingSessions() {
    return this.trainingSessionService.findAll();
  }

  @Mutation("createTrainingSession")
  async createTrainingSession(@Args("input") input: any) {
    return this.trainingSessionService.create(input);
  }
}
