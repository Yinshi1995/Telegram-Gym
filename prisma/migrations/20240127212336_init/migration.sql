/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "body_part_enum" AS ENUM ('Back', 'Chest', 'Core', 'Legs', 'Arms', 'Shoulders');

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Users" (
    "telegram_id" SERIAL NOT NULL,
    "phone_number" VARCHAR(15) NOT NULL,
    "full_name" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "weight" DECIMAL(65,30),
    "height" DECIMAL(65,30),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("telegram_id")
);

-- CreateTable
CREATE TABLE "Subscriptions" (
    "subscription_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'inactive',

    CONSTRAINT "Subscriptions_pkey" PRIMARY KEY ("subscription_id")
);

-- CreateTable
CREATE TABLE "WorkoutTypes" (
    "type_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type_name" TEXT NOT NULL,
    "body_part" "body_part_enum" NOT NULL,

    CONSTRAINT "WorkoutTypes_pkey" PRIMARY KEY ("type_id")
);

-- CreateTable
CREATE TABLE "Exercises" (
    "exercise_id" SERIAL NOT NULL,
    "type_id" INTEGER NOT NULL,
    "exercise_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Exercises_pkey" PRIMARY KEY ("exercise_id")
);

-- CreateTable
CREATE TABLE "TrainingSessions" (
    "session_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "workout_type_id" INTEGER NOT NULL,
    "exercise_id" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "TrainingSessions_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "NutritionTracking" (
    "tracking_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "consumed_calories" INTEGER NOT NULL,
    "recommended_calories" INTEGER NOT NULL,

    CONSTRAINT "NutritionTracking_pkey" PRIMARY KEY ("tracking_id")
);

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD CONSTRAINT "Subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("telegram_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutTypes" ADD CONSTRAINT "WorkoutTypes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("telegram_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercises" ADD CONSTRAINT "Exercises_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "WorkoutTypes"("type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSessions" ADD CONSTRAINT "TrainingSessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("telegram_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSessions" ADD CONSTRAINT "TrainingSessions_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercises"("exercise_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionTracking" ADD CONSTRAINT "NutritionTracking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("telegram_id") ON DELETE RESTRICT ON UPDATE CASCADE;
