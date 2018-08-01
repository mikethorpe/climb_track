require('sinatra')
require('sinatra/contrib/all') if development?
require_relative('controllers/exercises_controller.rb')
require_relative('controllers/workouts_controller.rb')
require_relative('controllers/helpers.rb')
require_relative('models/image_map')

#index
get '/' do
    @past_workouts = Workout.find_past_descending()
    @result_icons = ImageMap.icons()
    erb(:index)
end

# future
get '/future' do
    @future_workouts = Workout.find_future_ascending()
    erb(:future)
end

# help
get '/help' do
    @icon_hash = ImageMap.icons();
    erb(:help)
end