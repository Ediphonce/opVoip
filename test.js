var users = require('./models/panelMember');

users.getMembers(function(err, rows){
	if(err) console.log('Can not get panel members');

	console.log('The Firstname is : ' + rows[1].firstname);
});
users.getMemberById(1,function(err, row){
	if(err) cosole.log('can not get the user with id ' + 1);
	console.log('The Selected user is : ' + row[0].lastname);
});
 var data = users.findMember({'email':'eddiejose@gmail.co','password':'12345'},
 	function(err,row,msg){
 		if(err){
 			console.log('User Not Found : '+msg);
 			return;
 		}
 		console.log('The Selected user is : ' + row[0].lastname);
 	});
 

 // var data = {
// 	'firstname':'Eddie',
// 	'lastname':'Jose',
// 	'password':'12345',
// 	'email' : 'eddiejose@gmail.com',
// 	'department':'BSc CEIT'
// }
// users.addMember(data, function(err,row){
// 	if(err){
// 		console.log('Error Adding the user');
// 		return;
// 	}
// 	console.log('User Successfully Added');
// });
