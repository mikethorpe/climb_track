# Mike Thorpe 2018
# Seeds for database
require_relative('../models/exercise')
require_relative('../models/workout')

# Exercises ====================================================================

# Test delete_all and clear the database table before we start
Exercise.delete_all()

dead_hang_sloper_options = {
    'name' => 'Dead hang sloper',
    'reps' => 10,
    'sets' => 2,
    'notes' => ' 7 seconds on, 3 seconds off, 1 minute rest between sets'
}

dead_hang_sloper = Exercise.new(dead_hang_sloper_options)

# Test save method
dead_hang_sloper.save()

dead_hang_thin_crimp_options = {
    'name' => 'Dead hang thin crimp',
    'reps' => 10,
    'sets' => 2,
    'notes' => '7 seconds on, 3 seconds off, 1 minute rest between sets'
}

dead_hang_thin_crimp = Exercise.new(dead_hang_thin_crimp_options)
dead_hang_thin_crimp.save()

# Test update method
dead_hang_sloper.name = 'Dead hang pinch'
dead_hang_sloper.reps = 12
dead_hang_sloper.sets = 1
dead_hang_sloper.notes = '8 seconds on 4 off, 2 mins rest between sets'
dead_hang_sloper.update()

# Test delete method
dead_hang_sloper.delete()

# Test find_all method
exercises = Exercise.find_all()
exercises.each {|exercise| p exercise}

# Workouts =====================================================================

# Test delete_all and clear the database table before we start
Workout.delete_all()

finger_endurance_workout_options = {
    'name' => 'Finger endurance',
    'complete' => false
}
finger_endurance = Workout.new(finger_endurance_workout_options)

# Test save method
finger_endurance.save()

core_workout_options = {
    'name' => 'Core session',
    'complete' => false
}
core_workout = Workout.new(core_workout_options)
core_workout.save()

# Test update method
core_workout.name = "Core workout 2"
core_workout.complete = true
core_workout.update()

# Test delete method
finger_endurance.delete()

#  Test find_all method
workouts = Workout.find_all()
workouts.each {|workout| p workout}
