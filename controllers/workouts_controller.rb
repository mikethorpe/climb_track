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