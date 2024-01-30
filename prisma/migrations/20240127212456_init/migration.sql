-- AddForeignKey
ALTER TABLE "TrainingSessions" ADD CONSTRAINT "TrainingSessions_workout_type_id_fkey" FOREIGN KEY ("workout_type_id") REFERENCES "WorkoutTypes"("type_id") ON DELETE RESTRICT ON UPDATE CASCADE;
