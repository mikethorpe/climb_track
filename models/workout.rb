# Mike Thorpe 2018
# Workout class models workout table entries in db
require_relative('../db/sql_runner')
require_relative('exercise')
require_relative('activity')

class Workout
    
    attr_accessor :id, :name, :complete, :overall_result

    def initialize(options)
        @id = options['id'].to_i if options['id'] != nil
        @name = options['name']
        @complete = true?(options['complete'])
        @overall_result = options['overall_result'].to_i if options['overall_result'] != nil
    end

    def save()
        sql = "INSERT INTO workouts 
        (name, complete, overall_result) 
        VALUES($1, $2, $3) 
        RETURNING id;"
        values = [@name, @complete, @overall_result]
        result = SqlRunner.run(sql, values)
        @id = result.first['id'].to_i
    end

    def self.find(id)
        sql = "SELECT * FROM workouts
        WHERE workouts.id = $1"
        values = [id]
        result = SqlRunner.run(sql, values)
        workout_hash = result.first()
        return Workout.new(workout_hash)

    end

    def self.find_all()
        sql = "SELECT * FROM workouts;"
        result = SqlRunner.run(sql)
        return result.map { |workout| Workout.new(workout)}        
    end

    def update()
        @overall_result = self.calculate_average_result()
        sql = "UPDATE workouts 
        SET (name, complete, overall_result) = ($1, $2, $3) 
        WHERE workouts.id = $4;"
        values = [@name, @complete, @overall_result, @id]
        SqlRunner.run(sql, values)
    end

    def delete()
        sql = "DELETE FROM workouts WHERE workouts.id = $1;"
        values = [@id]
        SqlRunner.run(sql, values)
    end

    def self.delete_all()
        sql = "DELETE FROM workouts;"
        SqlRunner.run(sql)
    end

    def exercises()
        sql = "SELECT exercises.*
        FROM exercises
        INNER JOIN activities
        ON activities.exercise_id = exercises.id
        WHERE activities.workout_id = $1"
        values = [@id]
        result = SqlRunner.run(sql, values)
        return result.map { |exercise| Exercise.new(exercise)}
    end

    def activities()
        sql = "SELECT *
        FROM activities
        WHERE activities.workout_id = $1"
        values = [@id]
        result = SqlRunner.run(sql, values)
        return result.map { |activity| Activity.new(activity)}
    end

    def true?(some_string)
        return true if (some_string == "true" || some_string == "t" || some_string == "TRUE")
        return false
    end
    
    def calculate_average_result()
        activities = self.activities()
        return 0 if (activities.count == 0)
        
        total_points = 0
        activities.each { |activity| total_points += activity.result }    
        average = total_points.to_f / activities.count.to_f
        rounded_average = average.round        
        return rounded_average
    end

end