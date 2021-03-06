var express = require('express');
var router = express.Router();
var multer = require ('multer');
var upload = multer({dest: './uploads'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register.pug', {title:'Register'});
});

router.get('/login', function(req, res, next) {
  res.render('login.pug',{title:'Login'});
});

router.post('/register', upload.single('profileimage'), function(req, res, next) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	if(req.file){
		console.log('uploading file');
		var profileimage = req.file.filename;
	}
	else{
		console.log('No file upload');
		var profileimage = 'noimage.jpg';
	}

	//Form validator
	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('email', 'Email field is not email').isEmail();
	req.checkBody('username', 'Username field is required').notEmpty();
	req.checkBody('password', 'Password field is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);


	//Check error
	var errors = req.validationErrors();

	if(errors){
		res.render('register.pug', {
			errors: errors
		});
	}
	else{
		console.log('No error');
	}

});


module.exports = router;
