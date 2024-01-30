/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum body_part_enum {
  Back = "Back",
  Chest = "Chest",
  Core = "Core",
  Legs = "Legs",
  Arms = "Arms",
  Shoulders = "Shoulders",
}

export class ExerciseInput {
  exercise_id: number;
  type_id?: Nullable<number>;
  exercise_name?: Nullable<string>;
  description?: Nullable<string>;
}

export class NutritionTrackingInput {
  tracking_id: number;
  user_id?: Nullable<number>;
  date?: Nullable<DateTime>;
  consumed_calories?: Nullable<number>;
  recommended_calories?: Nullable<number>;
}

export class SubscriptionInput {
  subscription_id: number;
  user_id?: Nullable<number>;
  start_date?: Nullable<DateTime>;
  end_date?: Nullable<DateTime>;
  status?: Nullable<string>;
}

export class TrainingSessionInput {
  session_id: number;
  user_id?: Nullable<number>;
  date?: Nullable<DateTime>;
  workout_type_id?: Nullable<number>;
  exercise_id?: Nullable<number>;
  sets?: Nullable<number>;
  reps?: Nullable<number>;
  notes?: Nullable<string>;
}

export class UserInput {
  telegram_id: number;
  phone_number?: Nullable<string>;
  full_name?: Nullable<string>;
  username: string;
  password: string;
  weight?: Nullable<Decimal>;
  height?: Nullable<Decimal>;
  NutritionTracking?: Nullable<NutritionTrackingInput>;
  Subscriptions?: Nullable<SubscriptionInput>;
  TrainingSessions?: Nullable<TrainingSessionInput>;
  WorkoutTypes?: Nullable<WorkoutTypeInput>;
}

export class WorkoutTypeInput {
  type_id: number;
  user_id?: Nullable<number>;
  type_name?: Nullable<string>;
  body_part?: Nullable<body_part_enum>;
}

export class Exercise {
  exercise_id: number;
  type_id?: Nullable<number>;
  exercise_name?: Nullable<string>;
  description?: Nullable<string>;
  WorkoutType?: Nullable<WorkoutType>;
  TrainingSessions?: Nullable<Nullable<TrainingSession>[]>;
}

export abstract class IQuery {
  abstract exercise(
    exercise_id: number,
  ): Nullable<Exercise> | Promise<Nullable<Exercise>>;

  abstract allExercises():
    | Nullable<Nullable<Exercise>[]>
    | Promise<Nullable<Nullable<Exercise>[]>>;

  abstract nutritionTracking(
    tracking_id: number,
  ): Nullable<NutritionTracking> | Promise<Nullable<NutritionTracking>>;

  abstract allNutritionTracking():
    | Nullable<Nullable<NutritionTracking>[]>
    | Promise<Nullable<Nullable<NutritionTracking>[]>>;

  abstract subscription(
    subscription_id: number,
  ): Nullable<ISubscription> | Promise<Nullable<ISubscription>>;

  abstract allSubscriptions():
    | Nullable<Nullable<ISubscription>[]>
    | Promise<Nullable<Nullable<ISubscription>[]>>;

  abstract trainingSession(
    session_id: number,
  ): Nullable<TrainingSession> | Promise<Nullable<TrainingSession>>;

  abstract allTrainingSessions():
    | Nullable<Nullable<TrainingSession>[]>
    | Promise<Nullable<Nullable<TrainingSession>[]>>;

  abstract user(telegram_id: number): Nullable<User> | Promise<Nullable<User>>;

  abstract allUsers():
    | Nullable<Nullable<User>[]>
    | Promise<Nullable<Nullable<User>[]>>;

  abstract workoutType(
    type_id: number,
  ): Nullable<WorkoutType> | Promise<Nullable<WorkoutType>>;

  abstract allWorkoutTypes():
    | Nullable<Nullable<WorkoutType>[]>
    | Promise<Nullable<Nullable<WorkoutType>[]>>;
}

export abstract class IMutation {
  abstract createExercise(
    input?: Nullable<ExerciseInput>,
  ): Nullable<Exercise> | Promise<Nullable<Exercise>>;

  abstract createNutritionTracking(
    input?: Nullable<NutritionTrackingInput>,
  ): Nullable<NutritionTracking> | Promise<Nullable<NutritionTracking>>;

  abstract createSubscription(
    input?: Nullable<SubscriptionInput>,
  ): Nullable<ISubscription> | Promise<Nullable<ISubscription>>;

  abstract createTrainingSession(
    input?: Nullable<TrainingSessionInput>,
  ): Nullable<TrainingSession> | Promise<Nullable<TrainingSession>>;

  abstract createUser(
    input?: Nullable<UserInput>,
  ): Nullable<User> | Promise<Nullable<User>>;

  abstract updateUser(
    telegram_id: number,
    input?: Nullable<UserInput>,
  ): Nullable<User> | Promise<Nullable<User>>;

  abstract deleteUser(
    telegram_id: number,
  ): Nullable<User> | Promise<Nullable<User>>;

  abstract createWorkoutType(
    input?: Nullable<WorkoutTypeInput>,
  ): Nullable<WorkoutType> | Promise<Nullable<WorkoutType>>;
}

export class NutritionTracking {
  tracking_id: number;
  user_id?: Nullable<number>;
  date?: Nullable<DateTime>;
  consumed_calories?: Nullable<number>;
  recommended_calories?: Nullable<number>;
  Users?: Nullable<User>;
}

export abstract class ISubscription {
  abstract subscription_id(): number | Promise<number>;

  abstract user_id(): Nullable<number> | Promise<Nullable<number>>;

  abstract start_date(): Nullable<DateTime> | Promise<Nullable<DateTime>>;

  abstract end_date(): Nullable<DateTime> | Promise<Nullable<DateTime>>;

  abstract status(): Nullable<string> | Promise<Nullable<string>>;

  abstract Users(): Nullable<User> | Promise<Nullable<User>>;
}

export class TrainingSession {
  session_id: number;
  user_id?: Nullable<number>;
  date?: Nullable<DateTime>;
  workout_type_id?: Nullable<number>;
  exercise_id?: Nullable<number>;
  sets?: Nullable<number>;
  reps?: Nullable<number>;
  notes?: Nullable<string>;
  Exercise?: Nullable<Exercise>;
  Users?: Nullable<User>;
  WorkoutTypes?: Nullable<WorkoutType>;
}

export class User {
  telegram_id: number;
  phone_number?: Nullable<string>;
  birth_date?: Nullable<DateTime>;
  is_admin?: Nullable<boolean>;
  full_name?: Nullable<string>;
  username: string;
  password: string;
  weight?: Nullable<Decimal>;
  height?: Nullable<Decimal>;
  NutritionTracking?: Nullable<Nullable<NutritionTracking>[]>;
  Subscriptions?: Nullable<Nullable<ISubscription>[]>;
  TrainingSessions?: Nullable<Nullable<TrainingSession>[]>;
  WorkoutTypes?: Nullable<Nullable<WorkoutType>[]>;
}

export class WorkoutType {
  type_id: number;
  user_id?: Nullable<number>;
  type_name?: Nullable<string>;
  body_part?: Nullable<body_part_enum>;
  Exercise?: Nullable<Nullable<Exercise>[]>;
  TrainingSessions?: Nullable<Nullable<TrainingSession>[]>;
  Users?: Nullable<User>;
}

export type Decimal = any;
export type DateTime = any;
type Nullable<T> = T | null;
