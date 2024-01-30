import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { UserModule } from "./user/user.module";
import { SubscriptionModule } from "./subscription/subscription.module";
import { WorkoutTypeModule } from "./workout-type/workout-type.module";
import { TrainingSessionModule } from "./training-session/training-session.module";
import { NutritionTrackingModule } from "./nutrition-tracking/nutrition-tracking.module";
import { ExerciseModule } from "./exercise/exercise.module";
import { TelegramModule } from "./telegram/telegram.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./**/*.gql"],
      installSubscriptionHandlers: true,
    }),
    UserModule,
    WorkoutTypeModule,
    TrainingSessionModule,
    NutritionTrackingModule,
    ExerciseModule,
    SubscriptionModule,
    TelegramModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
