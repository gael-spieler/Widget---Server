const passport = require('passport')

module.exports = function(app){

	// ### API ###

	// Auth
	app.post('/api/signup/', require('./controllers/signup'));																		// Sign up - customer
	app.post('/api/providers/signup/', require('./controllers/signup_provider'));													// Sign up - provider
	app.post('/api/login/', require('./controllers/login'));																		// Login - both user types
	app.get('/api/logout/', require('./controllers/logout'));																		// Logout - both user types
	app.get('/api/widget/logout/', require('./controllers/logout'));

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
	app.delete('/api/users/', require('./controllers/user_delete'));										// Delete user

	// Widget
	app.get('/api/widget/services/:provider_id', require('./controllers/services_for_widget_read'));		// Get services of provider for widget (active)
	app.get('/api/widget/bookings/:provider_id', require('./controllers/bookings_of_day_read'));			// Get bookings of selected day for widget
	app.post('/api/bookings/', require('./controllers/booking_create'));							// Create booking


	// Dashboard
	// Provider
	app.get('/api/providers', passport.authenticate('jwt', {session: false}), require('./controllers/provider_read'));					// Get provider data
	app.get('/api/providers/users/:customer_id', require('./controllers/customer_read'));																// Get customer by ID
	app.patch('/api/providers/', require('./controllers/provider_update'));																				// Update provider


	// Services
	app.get('/api/providers/services/', passport.authenticate('jwt', {session: false}), require('./controllers/services_read'));								// Get all services of provider
	app.get('/api/providers/services/:service_id', passport.authenticate('jwt', {session: false}), require('./controllers/service_read'));					// Get service by ID
	app.post('/api/providers/services/', passport.authenticate('jwt', {session: false}), require('./controllers/service_create'));							// Create new service
	app.patch('/api/providers/services/:service_id', passport.authenticate('jwt', {session: false}), require('./controllers/service_update'));				// Update service

	// Bookings
	app.get('/api/provider/bookings/',passport.authenticate('jwt', {session: false}), require('./controllers/bookings_read'));						// Get all bookings of provider

	// Orders
	app.post('api/orders', require('./controllers/order_create'));
	
};
