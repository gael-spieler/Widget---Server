const passport = require('passport')

module.exports = function(app){

	// ### API ###

	// Auth
	app.post('/api/signup', require('./controllers/signup'));								// Sign up - customer
	app.post('/api/provider/signup/', require('./controllers/signup_provider'));			// Sign up - provider
	app.post('/api/login', require('./controllers/login'));									// Login - both user types
	app.get('/api/logout', require('./controllers/logout'));								// Logout - both user types

	// Google login
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
	app.get('/api/provider/users/:customer_id', require('./controllers/user_read'));				// Get user (customer) by ID
	app.get('/api/widget/users/', require('./controllers/provider_for_widget_read'));				// Get provider by ID
	app.delete('/api/users/', require('./controllers/user_delete'));								// Delete user
	app.patch('/api/users/provider/', require('./controllers/user_provider_update'));				// Update provider




	// Services
	app.post('/api/provider/services/', require('./controllers/service_create'));							// Create new service
	app.get('/api/provider/services/', require('./controllers/services_for_dashboard_read'));				// Get services of provider (all/archived/active)
	app.get('/api/widget/services/:provider_id', require('./controllers/services_for_widget_read'));		// Get services of provider for widget (active)
	app.patch('/api/provider/services/:service_id', require('./controllers/service_archive'));				// Archive or unarchive service

	// Bookings
	app.post('/api/bookings/', require('./controllers/booking_create'));							// Create appointment
};
