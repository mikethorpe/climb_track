# Mike Thorpe 2018
# Activity class models activity table entries in db
require_relative('../db/sql_runner')
require_relative('exercise')

class Activity

    attr_accessor :id, :workout_id, :exercise_id, :result

    def initialize(options)
        @id = options['id'].to_s if options['id'] != nil
        @workout_id = options['workout_id'].to_s
        @exercise_id = options['exercise_id'].to_s
        @result = options['result'].to_i
    end

    def save()
        sql = "INSERT INTO activities
        (workout_id, exercise_id, result)
        VALUES($1, $2, $3)
        RETURNING id;"
        values = [@workout_id, @exercise_id, @result]
        result = SqlRunner.run(sql, values)
        @id = result.first['id'].to_i
    end

    def self.find(id)
        sql = "SELECT *
        FROM activities
        WHERE activities.id = $1"
        values = [id]
        result = SqlRunner.run(sql, values)
        activity_hash = result.first()
        return Activity.new(activity_hash)
    end


    def self.find_all()
        sql = "SELECT * FROM activities;"
        result = SqlRunner.run(sql)
        return result.map { |activity| Activity.new(activity) }     
    end

    def update()
        sql = "UPDATE activities 
        SET result = $1 
        WHERE activities.id = $2;"
        values = [@result, @id]
        SqlRunner.run(sql, values)
    end

    def delete()
        sql = "DELETE FROM activities WHERE activities.id = $1;"
        values = [@id]
        SqlRunner.run(sql, values)
    end

    def self.delete_all()
        sql = "DELETE FROM activities;"
        SqlRunner.run(sql)
    end

    def exercise()
        sql = "SELECT * 
        FROM exercises
        WHERE exercises.id = $1"
        values = [@exercise_id]
        result = SqlRunner.run(sql, values)
        exercise_hash = result.first()
        return Exercise.new(exercise_hash)  
    end

end