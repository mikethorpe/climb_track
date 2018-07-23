# Mike Thorpe 2018
# Workout class models workout table entries in db
require_relative('../db/sql_runner')

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

end