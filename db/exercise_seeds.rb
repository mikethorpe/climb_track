require_relative('../models/exercise')

# https://www.beastmaker.co.uk/pages/training

# Dead hangs

# Choose a hold/grip type that you feel needs improving.

#  - Hang for 7 seconds, rest for 3.
#  - Repeat 6 times.
#  - Rest for 3 mins
#  - Choose another hold type and repeat...

dead_hang_options = {
    "name" => "Beastmaker Dead hangs",
    "reps" => 6,
    "sets" => 1,
    "notes" => "Hang for 7 seconds, rest for 3. Rest for 3 mins between sets"
}

dead_hangs = Exercise.new(dead_hang_options)
dead_hangs.save()

# https://www.beastmaker.co.uk/pages/training

#  Maximum Hangs

# Choose a hold/grip type that you feel needs improving.

#  - Hang for 10/12 seconds
#  - Rest for 3-5 mins - until you feel totally recovered
#  - Repeat 3-5 times
#  - Choose another hold type and repeat...

maximum_hang_options = {
    "name" => "Beastmaker Maximum hangs",
    "reps" => 1,
    "sets" => 5,
    "notes" => "Choose a hold/grip type that you feel needs improving. Rest for 3-5 mins - until you feel totally recovered."
}

maximum_hangs = Exercise.new(maximum_hang_options)
maximum_hangs.save()
