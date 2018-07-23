require_relative('../models/exercise')

# exercises
get '/exercises' do
    @all_exercises = Exercise.find_all()
    erb(:"exercises/index")
end

# new
get '/exercises/new' do
    erb(:"exercises/new")
end

post '/exercises' do
    exercise = Exercise.new(params)
    exercise.save()
    redirect to ("/exercises")
end