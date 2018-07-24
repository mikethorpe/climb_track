require('sinatra')
require('sinatra/contrib/all')
require_relative('controllers/exercises_controller.rb')
require_relative('controllers/workouts_controller.rb')
require_relative('models/image_map')

also_reload('./models/*')

#index
get '/' do
    @all_workouts = Workout.find_all()
    @result_icons = ImageMap.icons()
    erb(:index)
end

# future
get '/future' do
    @all_workouts = Workout.find_all()
    erb(:future)
end

# help
get '/help' do
    erb(:help)
end