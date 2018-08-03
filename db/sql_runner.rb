require('pg')

class SqlRunner

    def self.run(sql, values = [])
        
        begin
            db = PG.connect( {dbname: 'ddv9dqgfhacosg',
                host: 'ec2-50-16-195-131.compute-1.amazonaws.com',
                port: 5432, user: 'zchicsmqeyppsm', password: 'b607972720b4dedf55dd8b4babf01a4455e192eea109b556df2846f46257c87a'})
            db.prepare("query", sql)
            result = db.exec_prepared("query", values)
        ensure 
            db.close() if db !=nil
        end

        return result   
        
    end
end