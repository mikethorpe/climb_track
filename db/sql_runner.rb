# Mike Thorpe 2018
# SqlRunner class runs query on PostgreSQL database
require('pg')

class SqlRunner

    def self.run(sql, values = [])
        
        begin
            db = PG.connect({dbname: 'climb_track', host: 'localhost'})
            db.prepare("query", sql)
            result = db.exec_prepared("query", values)
        ensure 
            db.close() if db !=nil
        end

        return result
        
    end
end