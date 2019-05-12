const passport = require('passport')

module.exports = function(app){

	// ### API ###

	// Auth

	// Sign up
	app.post('/api/signup', require('./controllers/signup'));
	app.post('/api/provider/signup/', require('./controllers/signup_provider'));

	// Login
	app.post('/api/login', require('./controllers/login'));

	// Logout
	app.get('/api/logout', require('./controllers/logout'));

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

	// Create user
	// app.post('/api/users', require('./controllers/user_create'));

	// Get users and delete users
	app.get('/api/users', require('./controllers/users_read'));
	app.get('/api/users/:id', require('./controllers/user_read'));
	app.delete('/api/users/:id', require('./controllers/user_delete'));

	// Update user (users of base schema)
	app.patch('/api/users/:id', require('./controllers/user_update'));

	// Update provider
	app.patch('/api/users/provider/:id', require('./controllers/provider_update'));





	// Services
	// Create new service
	app.post('/api/services', require('./controllers/service_create'));
	app.get('/api/services/:id', require('./controllers/services_read'));





	app.get('/api/channels', require('./controllers/channels_read'))
	app.get('/api/channels/:id', require('./controllers/channel_read'))
	app.post('/api/channels', require('./controllers/channel_create'))
	app.patch('/api/channels/:id', require('./controllers/channel_update'))
	app.delete('/api/channels/:id', require('./controllers/channel_delete'))

	// Messages

	app.get('/api/messages', require('./controllers/messages_read'))
	app.post('/api/messages', require('./controllers/message_create'))
	app.patch('/api/messages/:id', require('./controllers/message_update'))
	app.delete('/api/messages/:id', require('./controllers/message_delete'))



};
