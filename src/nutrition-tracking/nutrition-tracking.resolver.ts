import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { NutritionTrackingService } from "./nutrition-tracking.service";

@Resolver("NutritionTracking")
export class NutritionTrackingResolver {
  constructor(
    private readonly nutritionTrackingService: NutritionTrackingService,
  ) {}

  @Query("nutritionTracking")
  async getNutritionTracking(@Args("tracking_id") trackingId: number) {
    return this.nutritionTrackingService.findOne(trackingId);
  }

  @Query("allNutritionTracking")
  async getAllNutritionTracking() {
    return this.nutritionTrackingService.findAll();
  }

  @Mutation("createNutritionTracking")
  async createNutritionTracking(@Args("input") input: any) {
    return this.nutritionTrackingService.create(input);
  }
}
