require('sinatra')
require('sinatra/contrib/all')
require_relative('controllers/exercises_controller.rb')
require_relative('controllers/workouts_controller.rb')

also_reload('./models/*')

#index
get '/' do
    @all_workouts = Workout.find_all()
    erb(:index)
end

# future
get '/future' do
    @all_workouts = Workout.find_all()
    p "These are workouts"
    @all_workouts.each{|workout| p workout}
    erb(:future)
end

# help
get '/help' do
    erb(:help)
end