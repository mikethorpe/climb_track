require_relative('../models/workout')

# show
get '/workouts/:id' do
    @workout = Workout.find(params['id'])
    @exercises = @workout.exercises()
    erb(:"workouts/show")
end
