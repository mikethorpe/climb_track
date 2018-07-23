# Mike Thorpe 2018
# Workout class models workout table entries in db
require_relative('../db/sql_runner')
require_relative('exercise')

class Workout
    
    attr_accessor :id, :name, :complete

    def initialize(options)
        @id = options['id'].to_s if options['id'] != nil
        @name = options['name']
        @complete = options['complete']
    end

    def save()
        sql = "INSERT INTO workouts 
        (name, complete) 
        VALUES($1, $2) 
        RETURNING id;"
        values = [@name, @complete]
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
        sql = "UPDATE workouts 
        SET (name, complete) = ($1, $2) 
        WHERE workouts.id = $3;"
        values = [@name, @complete, @id]
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

end