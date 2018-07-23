# Mike Thorpe 2018
# Exercise class models exercise entries in db
require_relative('../db/sql_runner')

class Exercise

    attr_accessor :id, :name, :reps, :sets, :notes

    def initialize(options)
        @id = options['id'].to_s if options['id'] != nil
        @name = options['name']
        @reps = options['reps'].to_i
        @sets = options['sets'].to_i
        @notes = options['notes']
    end

    def save()
        sql = "INSERT INTO exercises 
        (name, reps, sets, notes) 
        VALUES($1, $2, $3, $4) 
        RETURNING id;"
        values = [@name, @reps, @sets, @notes]
        result = SqlRunner.run(sql, values)
        @id = result.first['id'].to_i
    end

    def self.find(id)
        sql = "SELECT * FROM exercises
        WHERE exercises.id = $1"
        values = [id]
        result = SqlRunner.run(sql, values)
        exercise_hash = result.first()
        return Exercise.new(exercise_hash)

    end

    def self.find_all()
        sql = "SELECT * FROM exercises;"
        result = SqlRunner.run(sql)
        return result.map { |exercise| Exercise.new(exercise)}        
    end

    def update()
        sql = "UPDATE exercises 
        SET (name, reps, sets, notes) = ($1, $2, $3, $4) 
        WHERE exercises.id = $5;"
        values = [@name, @reps, @sets, @notes, @id]
        SqlRunner.run(sql, values)
    end

    def delete()
        sql = "DELETE FROM exercises WHERE exercises.id = $1;"
        values = [@id]
        SqlRunner.run(sql, values)
    end

    def self.delete_all()
        sql = "DELETE FROM exercises;"
        SqlRunner.run(sql)
    end

end
