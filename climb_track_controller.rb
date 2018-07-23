require('sinatra')
require('sinatra/contrib/all')
require_relative('controllers/exercises_controller.rb')
also_reload('./models/*')

#index
get '/' do
    erb(:index)
end

# future
get '/future' do
    erb(:future)
end

# help
get '/help' do
    erb(:help)
end