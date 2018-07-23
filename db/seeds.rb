# Mike Thorpe 2018
# Seeds for database
require_relative('../models/exercise')

# Clear the database before we start
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

#  Test find_all method
exercises = Exercise.find_all()
exercises.each {|exercise| p exercise}
