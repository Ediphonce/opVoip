var db = require('../config/db');
var crypto = require('crypto');
var sess;
exports.getMembers = function(callback){
	db.query('SELECT * FROM panel_members', function(err, rows,fields){
		if(err){console.log(err.stack); callback(true); return;}
		callback(false, rows);
	});
}
exports.getMemberById = function(id,callback){
	db.query('SELECT * FROM panel_members WHERE id=? ',[id],
		function(err, row, fields){
			if(err){console.log(err.stack); callback(true); return;}
			callback(false, row);
		});
}
exports.addMember = function(data,callback){
	if(data.firstname == undefined || data.lastname == undefined || 
		data.email == undefined || data.password == undefined ||
		data.department == undefined) {
		//console.log('Empty Fields');
		callback(true, 'Empty Fields');
			return;
		}
		var queryString = "INSERT INTO panel_members ";
			queryString +="(firstname,lastname,email,password,department) ";
			queryString +="VALUES(?,?,?,?,?)";
var password = crypto.createHash('md5').update(data.password).digest("hex");	
		db.query(queryString,
		[data.firstname,data.lastname,data.email,password,data.department],
		function(err, row, fields){
			if(err){ 
				//console.log('Error inserting Data');
				callback(true,'Error Inserting Data'); return;}
			callback(false,' A new user was Added Successfully',row);
		});
}
exports.deleteMember = function(id,callback){
	db.query('DELETE FROM panel_members WHERE id=?',[id],
		function(err, row, fields){
			if(err) { 
				var msg=err.stack;
				callback(true,msg);
				return;}
				var msg = 'The user with id : '+ id +' was Successfully Deleted';
				callback(false,msg,row);	
	});

}
exports.authenticate = function(data,callback){
		var email = data.email;
		var password = crypto.createHash('md5').update(data.password).digest("hex");	
		
			var queryString = 'SELECT panel_members.*,roles.role_name FROM panel_members ';
			queryString+='JOIN assigned_roles ON assigned_roles.user_id = panel_members.id ';
			queryString+='JOIN roles ON roles.id=assigned_roles.role ';
			queryString+='WHERE email=? AND password=?';
			db.query(queryString,[email, password],function(err, row, fields){
				if(row.length== undefined || row.length < 1){
					//console.log(err.stack);
					var row = 'error';
					var msg = 'Wrong Email or Password';
					callback(true,false,msg);
					return ;
				}
					//Check User
					var data = {
						'firstname':row[0].firstname,
						'lastname':row[0].lastname,
						'email':row[0].email,
						'dept':row[0].dept,
						'role':row[0].role_name
					}
					var msg = 'login Successfull';
					callback(false,data, msg);
					return;
				
			});
			//callback(false, 'row', 'login Success');
			}
					