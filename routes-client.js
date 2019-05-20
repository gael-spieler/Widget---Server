module.exports = function(app){

	// ### Client ###

	app.get('/', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
		res.sendFile(__dirname + '/client/index.html')
	});
	app.get('/login', function(req, res, next) {
		res.sendFile(__dirname + '/client/login.html')
	});
	app.get('/signup', function(req, res, next) {
		res.sendFile(__dirname + '/client/signup.html')
	})

}
