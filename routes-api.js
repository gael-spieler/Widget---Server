const passport = require('passport')

module.exports = function(app){

	// ### API ###

	// Auth
	app.post('/api/signup', require('./controllers/signup'));								// Sign up - customer
	app.post('/api/provider/signup/', require('./controllers/signup_provider'));			// Sign up - provider
	app.post('/api/login', require('./controllers/login'));									// Login - both user types
	app.get('/api/logout', require('./controllers/logout'));								// Logout - both user types

	// // Google login
	// app.get('/google/redirect', passport.authenticate('google'), function(req, res, next) {
	// 	if (req.user) {
	// 		res.redirect('/')
	// 	} else {
	// 		res.redirect('/login')
	// 	}
	// });
	//
	// // Google authentication
	// app.get('/api/google', passport.authenticate('google', {
	// 	scope: [
	// 		'https://www.googleapis.com/auth/userinfo.profile',
	// 		'https://www.googleapis.com/auth/userinfo.email'
	// 	]
	// }));


	// Users
	app.get('/api/widget/users/', require('./controllers/provider_for_widget_read'));				// Get provider by ID
	app.delete('/api/users/', require('./controllers/user_delete'));								// Delete user

	app.get('/api/provider/users/:customer_id', require('./controllers/user_read'));				// Get customer by ID
	app.patch('/api/provider/', require('./controllers/provider_update'));							// Update provider




	// Services
	app.get('/api/provider/services/', passport.authenticate('jwt', {session: false}), require('./controllers/services_read'));								// Get all services of provider
	app.get('/api/provider/services/:service_id', passport.authenticate('jwt', {session: false}), require('./controllers/service_read'));					// Get service by ID
	app.post('/api/provider/services/', passport.authenticate('jwt', {session: false}), require('./controllers/service_create'));							// Create new service
	app.patch('/api/provider/services/:service_id', passport.authenticate('jwt', {session: false}), require('./controllers/service_update'));				// Update service

	app.get('/api/widget/services/:provider_id', require('./controllers/services_for_widget_read'));		// Get services of provider for widget (active)


	// Bookings
	app.post('/api/bookings/', require('./controllers/booking_create'));							// Create appointment
};
