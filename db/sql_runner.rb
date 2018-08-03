require('pg')

class SqlRunner

    def self.run(sql, values = [])
        
        begin
            db = PG.connect( {dbname: 'd76443mlq3h3sg',
                host: 'ec2-54-217-235-16.eu-west-1.compute.amazonaws.com',
                port: 5432, user: 'ymqsmjgyjxilqz', password: 'e2d633afdac8663995b75ca396230a21a3105456425e6fc40f28705f9be3a775'})
            db.prepare("query", sql)
            result = db.exec_prepared("query", values)
        ensure 
            db.close() if db !=nil
        end

        return result   
        
    end
end