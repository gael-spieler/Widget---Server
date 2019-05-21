// const passport = require('passport')
//
// module.exports = function(app){
//
//     // ### API ###
//
//     // Auth
//     app.post('/signup', require('./controllers/signup'));								// Sign up - customer
//     app.post('/provider/signup/', require('./controllers/signup_provider'));			// Sign up - provider
//     app.post('/login', require('./controllers/login'));									// Login - both user types
//     app.get('/logout', require('./controllers/logout'));								// Logout - both user types
//
//
//     // Google login
//     app.get('/google/redirect', passport.authenticate('google'), function(req, res, next) {
//         if (req.user) {
//             res.redirect('/')
//         } else {
//             res.redirect('/login')
//         }
//     });
//
//     // Google authentication
//     app.get('/api/google', passport.authenticate('google', {
//         scope: [
//             'https://www.googleapis.com/auth/userinfo.profile',
//             'https://www.googleapis.com/auth/userinfo.email'
//         ]
//     }));
// };
