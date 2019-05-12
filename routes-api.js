const passport = require('passport')

module.exports = function(app){

	// ### API ###

	// Auth
	app.post('/api/signup', require('./controllers/signup'));								// Sign up - customer
	app.post('/api/provider/signup/', require('./controllers/signup_provider'));			// Sign up - provider
	app.post('/api/login', require('./controllers/login'));									// Login - both user types
	app.get('/api/logout', require('./controllers/logout'));								// Logout - both user types

	// Google loginn
	app.get('/google/redirect', passport.authenticate('google'), function(req, res, next) {
		if (req.user) {
			res.redirect('/')
		} else {
			res.redirect('/login')
		}
	});

	// Google authentication
	app.get('/api/google', passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}));


	// Users
	app.get('/api/users/:id', require('./controllers/user_read'));							// Get user by ID
	app.delete('/api/users/:id', require('./controllers/user_delete'));						// Delete user
	app.patch('/api/users/:id', require('./controllers/user_update'));						// Update user - base schema
	app.patch('/api/users/provider/:id', require('./controllers/provider_update'));			// Update provider
	// app.post('/api/users', require('./controllers/user_create'));						// Create user
	// app.get('/api/users', require('./controllers/users_read'));								// Get all users


	// Services
	app.post('/api/services', require('./controllers/service_create'));						// Create new service
	app.get('/api/services/:id', require('./controllers/services_read'));					// Get all services of provider
	app.patch('/api/archive/services/:id', require('./controllers/service_archive'));		// Toggle archive property of service

};
