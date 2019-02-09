require_relative('../models/exercise')

# index
get '/exercises' do
    @all_exercises = Exercise.find_all()
    erb(:"exercises/index")
end

# create
get '/exercises/new' do
    erb(:"exercises/new")
end

post '/exercises' do
    exercise = Exercise.new(params)
    exercise.save()
    redirect to ("/exercises")
end

#  delete
get '/exercises/:id/delete' do
    @exercise = Exercise.find(params['id'])
    erb(:"exercises/delete")
end

post '/exercises/:id/delete' do
    exercise = Exercise.find(params['id'])
    exercise.delete()
    redirect to ("/exercises")
end

# edit
get '/exercises/:id/edit' do
    @exercise = Exercise.find(params['id'])
    erb(:"exercises/edit")
end

# update
post '/exercises/:id/edit' do
    exercise = Exercise.new(params)
    exercise.update()
    redirect to ("/exercises")
end