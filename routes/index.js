var express = require('express');
var router = express.Router();
var users = require('../models/panelMember');
var sess;
render = 'empty';

/* GET home page. */
router.get('/', function(req, res) {
	sess = req.session;
	if(!sess.logedIn){
		sess.logedIn = false;
	}
	var data = setData(false,'');
    res.render('pages/index',data);
    //next();
});
router.get('/about', function(req, res){
	var data = {
		'title':'Express Site',
		'numbers':[3,4,5,6,9],
		'family':{
			'fathers':['Eddie','msulu','brat'],
			'sons':['rascal','diana','smallbrat']
		},
		'car':'volvo'
	}
	res.render('pages/about');
	//next();
});
router.get('/presentation',function(req, res){
	if(sess.logedIn === undefined || sess.logedIn === null){
		var data = setData(true,'info','Please Login to start');
		res.render('pages/index', data);
	}else{
		if(sess.logedIn && typeof sess.logedIn !== undefined && sess.logedIn !== null){
			var data = setData(false,'info','Welcome');
			res.render('pages/shareScreen', data);

		}else{
			var data = setData(true,'info','Please Login to start');
			res.render('pages/index', data);
		}
	}
});
router.get('/add-user',function(req, res){
	if(sess.logedIn === undefined || sess.logedIn === null){
		var data = setData(true,'info','Please Login to start');
		res.render('pages/index', data);
	}else{
		if(sess.logedIn && typeof sess.logedIn !== undefined && sess.logedIn !== null){
			var data = setData(false,'info','Welcome');
			res.render('pages/addUser', data);

		}else{
			var data = setData(true,'info','Please Login to start');
			res.render('pages/index', data);
		}
	}
});
router.post('/add-user',function(req, res){
	if(sess.logedIn === undefined || sess.logedIn === null){
		var data = setData(true,'info','Please Login to start');
		res.render('pages/index', data);
	}else{
		if(typeof sess.logedIn !== undefined && sess.logedIn !== null && sess.logedIn){
			var email = req.body.email;
    		var password = req.body.password;
    		var passwordConfirmation = req.body.passwordConfirmation;
    		var firstname = req.body.firstname;
    		var lastname = req.body.lastname;
    		var dept = req.body.department;

    		if(password.localeCompare(passwordConfirmation) == 0){//Check password match
    			var userData = {
    			'firstname':firstname,
    			'lastname' :lastname,
    			'department':dept,
    			'password':password,
    			'email':email
    			}
    			users.addMember(userData, function(err,msg){
    				if(err) {//If add user Fails
    					var data = setData(true,'danger',msg,email,password,firstname,lastname,dept);
						res.render('pages/addUser', data);
    				}else{// Success
    					var data = setData(true,'info',msg);
						res.render('pages/addUser', data);
    				}
    			});
    		}else{ // Password Don't match
    			var data = setData(true,'danger','Passwords Don\'t Match',email,password,firstname,lastname,dept);
    			
				res.render('pages/addUser', data);
    		}
    		
		}else{
			var data = setData(true,'info','Please Login to start');
			res.render('pages/index', data);
		}
	}
});
router.get('/view-users',function(req, res){
	if(sess.logedIn === undefined || sess.logedIn === null){
		var data = setData(true,'info','Please Login to start');
		res.render('pages/index', data);
	}else{
		if(sess.logedIn && typeof sess.logedIn !== undefined && sess.logedIn !== null){
			var data = setData(true,'info','Welcome');
			res.render('pages/viewUsers', data);

		}else{
			var data = setData(true,'info','Please Login to start');
			res.render('pages/index', data);
		}
	}
});
router.get('/account',function(req, res){
	if(sess.logedIn === undefined || sess.logedIn === null){
		var data = setData(true,'info','Please Login to start');
		res.render('pages/index', data);
	}else{
		if(sess.logedIn && typeof sess.logedIn !== undefined && sess.logedIn !== null){
			var data = setData(true,'info','Welcome');
			res.render('pages/account', data);

		}else{
			var data = setData(true,'info','Please Login to start');
			res.render('pages/index', data);
		}
	}
});
router.get('/edit-account',function(req, res){
	if(sess.logedIn === undefined || sess.logedIn === null){
		var data = setData(true,'info','Please Login to start');
		res.render('pages/index', data);
	}else{
		if(sess.logedIn && typeof sess.logedIn !== undefined && sess.logedIn !== null){
			var data = setData(true,'info','Welcome');
			res.render('pages/changePassword', data);

		}else{
			var data = setData(true,'info','Please Login to start');
			res.render('pages/index', data);
		}
	}
});
router.get('/view-sesssions',function(req, res){
	if(sess.logedIn === undefined || sess.logedIn === null){
		var data = setData(true,'info','Please Login to start');
		res.render('pages/index', data);
	}else{
		if(typeof sess.logedIn !== undefined && sess.logedIn !== null && sess.logedIn){
			var data = setData(true,'info','Welcome');
			res.render('pages/viewSessions', data);

		}else{
			var data = setData(true,'info','Please Login to start');
			res.render('pages/index', data);
		}
	}
});
router.post('/presentation', function(req, res){
	var email = req.body.email;
    var password = req.body.password;
    sess = req.session;
   	users.authenticate({'email':email, 'password':password}, 
   		function(err, row, msg ){
   			if(err){
   			var data = setData(true,'danger',msg,email,password);
   				res.render('pages/index',data);
   				return;
   			}
   			sess.email = row.email;
   			sess.firstname = row.firstname;
   			sess.lastname = row.lastname;
   			sess.dep = row.dept;
   			sess.role = row.role;
   			sess.logedIn = true;
   			var data = setData(true,'danger',msg);
   			res.render('pages/shareScreen', data);
   		});
});
	router.get('/logout',function(req,res){
req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
    res.redirect('/');
  }
});

});
router.get('/share-screen',function(req, res, next){
	if(sess.logedIn === undefined || sess.logedIn === null ){
		var data = setData(true,'info','Please Login to start');
		res.render('pages/index', data);
	}else{
		if(sess.logedIn && typeof sess.logedIn !== undefined && sess.logedIn !== null){
			var data = setData(true,'info','Welcome');
			res.render('pages/shareScreen', data);

		}else{
			var data = setData(true,'info','Please Login to start');
			res.render('pages/index', data);
		}
		
	}
	
	//next();
});
router.get('/admin',function(req, res, next){
	if(sess.logedIn === undefined || sess.logedIn === null){
		var data = setData(true,'info','Please Login to start');
			res.render('pages/index', data);
	}else{
		if(sess.logedIn && typeof sess.logedIn !== undefined && sess.logedIn !== null){
			var data = setData(true,'info','Welcome');
			res.render('pages/admin', data);

		}else{
			var data = setData(true,'info','Please Login to start');
			res.render('pages/index', data);
		}
	}
	
	//next();
});
router.get('/join-session',function(req, res, next){
	if(sess.logedIn === undefined || sess.logedIn === null){
		var data = setData(true,'info','Please Login to start');
			res.render('pages/index', data);
	}else{
		if(sess.logedIn && typeof sess.logedIn !== undefined && sess.logedIn !== null){
			var data = setData(true,'info','Welcome');
			res.render('pages/joinSession', data);

		}else{
			var data = setData(true,'info','Please Login to start');
			res.render('pages/index', data);
		}
	}
	
	//next();
});
function setData(fd, fdType, msg, email, pswd,inFname,inLname,inDept){
		if(!sess.firstname){sess.firstname='';}
		if(!sess.lastname){sess.lastname='';}
		if(!sess.role){sess.role='';}
		if(!msg){msg = '';}if(!email){email = '';} if(!pswd){pswd = '';}
		var data = {
			'feedback':fd,
			'feedbackType' : fdType,
			'message':msg,
			'email':email,
			'password':pswd,
			'role':sess.role,
			'logedIn':sess.logedIn,
			'firstname':sess.firstname,
			'lastname':sess.lastname,
			'inFirstname':inFname,
			'inLastname':inLname,
			'inDept':inDept
		}
		return data;
}						
module.exports = router;
