require_relative('../models/workout')
require("pry")

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
    workout.update()
    update_activity_results(workout, params)
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
    erb(:"workouts/results")
end


# show results
get '/workouts/:id/edit' do
    @workout = Workout.find(params['id'])
    @exercises = Exercise.find_all()
    erb(:"workouts/edit")
end

# delete activity from workout during edit
post '/workouts/:id/delete_activity' do
    activity = Activity.find(params['activity_id'])
    activity.delete()
    path = '/workouts/' + params['id'] + '/edit'
    redirect to(path)
end

# add activity to workout during edit
post '/workouts/:workout_id/add_activity' do
    activity = Activity.new(params)
    activity.save()
    path = '/workouts/' + params['workout_id'] + '/edit'
    redirect to(path)
end
