require_relative('../models/workout')

# new workout
get '/workouts/create' do
    erb(:"workouts/create")
end

post '/workouts/create' do
    workout = Workout.new(params)
    workout.save()
    path = '/workouts/' + workout.id.to_s + '/update_activities'
    redirect to(path)
end

# update activities
get '/workouts/:id/update_activities' do
    @workout = Workout.find(params['id'])
    @exercises = Exercise.find_all()
    erb(:"workouts/update_activities")
end

# show
get '/workouts/:id' do
    @workout = Workout.find(params['id'])
    @exercises = @workout.exercises()
    erb(:"workouts/show")
end


# run workout
get '/workouts/:id/run' do
    @workout = Workout.find(params['id'])
    @exercises = @workout.exercises()
    erb(:"workouts/run")
end

post '/' do
    workout = Workout.find(params['id'])
    workout.complete = true
    update_activity_results(workout, params)
    workout.update()
    redirect to('/')
end


def update_activity_results(workout, params)

    activities = workout.activities()
    
    for activity in activities
        activityresult_key = "activityresult_" + activity.id.to_s
        activity.result = params[activityresult_key] if params[activityresult_key] != nil
        activity.update()
    end

end

# show results
get '/workouts/:id/results' do
    @workout = Workout.find(params['id'])
    @result_icons = ImageMap.icons()
    erb(:"workouts/results")
end


# edit
get '/workouts/:id/edit' do
    @workout = Workout.find(params['id'])
    @exercises = Exercise.find_all()
    erb(:"workouts/edit")
end

post '/workouts/:id/edit' do
    workout = Workout.find(params['id'])
    workout.name = params['name']
    workout.update()
    path = '/workouts/' + params['id'] + '/update_activities'
    redirect to(path)
end

# delete activity from workout during edit
post '/workouts/:id/delete_activity' do
    activity = Activity.find(params['activity_id'])
    activity.delete()
    path = '/workouts/' + params['id'] + '/update_activities'
    redirect to(path)
end

# add activity to workout during edit
post '/workouts/:workout_id/add_activity' do
    activity = Activity.new(params)
    activity.save()
    path = '/workouts/' + params['workout_id'] + '/update_activities'
    redirect to(path)
end

post '/workouts/:id/delete' do
    workout = Workout.find(params['id'])
    workout.delete()
    redirect to('/future')
end
