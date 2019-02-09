require_relative('../models/exercise')
require_relative('../models/workout')
require_relative('../models/activity')

# https://www.beastmaker.co.uk/pages/training

# Dead hangs

# Choose a hold/grip type that you feel needs improving.

#  - Hang for 7 seconds, rest for 3.
#  - Repeat 6 times.
#  - Rest for 3 mins
#  - Choose another hold type and repeat...

dead_hangs_options = {
    "name" => "Beastmaker Dead hangs",
    "reps" => 6,
    "sets" => 1,
    "notes" => "Hang for 7 seconds, rest for 3. Rest for 3 mins between sets"
}

dead_hangs = Exercise.new(dead_hangs_options)
dead_hangs.save()

# https://www.beastmaker.co.uk/pages/training

#  Maximum Hangs

# Choose a hold/grip type that you feel needs improving.

#  - Hang for 10/12 seconds
#  - Rest for 3-5 mins - until you feel totally recovered
#  - Repeat 3-5 times
#  - Choose another hold type and repeat...

maximum_hangs_options = {
    "name" => "Beastmaker Maximum hangs",
    "reps" => 1,
    "sets" => 5,
    "notes" => "Choose a hold/grip type that you feel needs improving. Rest for 3-5 mins - until you feel totally recovered."
}

maximum_hangs = Exercise.new(maximum_hangs_options)
maximum_hangs.save()

beast_maker_workout_options =  {
    "name" => "Beastmaker Workout",
    "date" => "2020-12-25",
    "overall_result" => -1
}

beast_maker_workout = Workout.new(beast_maker_workout_options)
beast_maker_workout.save()


dead_hangs_beast_maker_activity_options = {
    "workout_id" => beast_maker_workout.id,
    "exercise_id" => dead_hangs.id
}

dead_hangs_beast_maker_activity = Activity.new(dead_hangs_beast_maker_activity_options)
dead_hangs_beast_maker_activity.save()

maximum_hangs_beast_maker_activity_options = {
    "workout_id" => beast_maker_workout.id,
    "exercise_id" => maximum_hangs.id
}

maximum_hangs_beast_maker_activity = Activity.new(maximum_hangs_beast_maker_activity_options)
maximum_hangs_beast_maker_activity.save()