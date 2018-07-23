require_relative('../models/exercise')

# exercises
get '/exercises' do
    @all_exercises = Exercise.find_all()
    erb(:"exercises/index")
end