describe('The database Configuration',function(){
	
	it('Should Connect to the Database Successfuly',function(next){
			var db = require('../config/db');
			db.query('SELECT 1 + 1 AS solution ',function(err, rows, fields){
					expect(err).toBe(null);
					expect(rows[0].solution).toBe(2);
			});
			next();
	});

});