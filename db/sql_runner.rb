# Mike Thorpe 2018
# SqlRunner class runs query on PostgreSQL database
require('pg')

class SqlRunner

    def self.run(sql, values = [])
        
        begin
            db = PG.connect({
                dbname: 'd3j9p3drbina54', 
                host: 'ec2-54-235-177-183.compute-1.amazonaws.com',
                port: 5432, 
                user: 'wynmmomzjvpexn', 
                password: '44f1e6d68c7b1c22fc9c4d7216cff72f9ea8bd113646c22bb4fb0af4882ac382'
            })
            db.prepare("query", sql)
            result = db.exec_prepared("query", values)
        ensure 
            db.close() if db !=nil
        end

        return result   
        
    end
end