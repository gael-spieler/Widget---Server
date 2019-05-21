const passport = require('passport');
const passport_local = require('passport-local').Strategy;
const passport_google = require('passport-google-oauth20');
const bcrypt = require('bcrypt');
const db_user = require('./models/user');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = function(app) {

	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(new passport_local({
		usernameField: 'email',
		passwordField: 'password'
	}, function(email, password, done) {
		db_user.findOne({
			email: email
		})
		// .exec()
		.then(function(user) {
			if (!user) { // if user not found
				return done(null, false) // error, user
			}
			if (!bcrypt.compareSync(password, user.password)) {
				return done(null, false)
			}
			return done(null, user) // error, user
		}).catch(function(err) {
			console.log('err', err);
			return done(err)
		})

	}));

	passport.serializeUser(function(user, done) {
		done(null, user._id) // error, user id
	});

	passport.deserializeUser(function(id, done) {
		db_user.findById(id).then(function(user) {
			done(null, user)
		}).catch(function(err) {
			return done(err)
		})
	});


	passport.use(new JWTStrategy({
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey   : process.env.JWT_SECRET
		},
		function (jwtPayload, cb) {

			//find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
			return db_user.findById(jwtPayload._id)
				.then(user => {
					return cb(null, user);
				})
				.catch(err => {
					return cb(err);
				});
		}
	));

	// Google Auth
	//
	// passport.use(new passport_google({
	// 	clientID: process.env.GOOGLE_CLIENT_ID,
	// 	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	// 	callbackURL: process.env.GOOGLE_CALLBACK_URL
	// }, function(access_token, refresh_token, profile, done) { // this data comes back from google
	// 	// console.log('profile', profile);
	// 	// find a user with google id same as the one coming from google response
	// 	db_user.findOne({
	// 		'google.id': profile.id
	// 	}).then(function(user) {
	// 		// if user exists in database, pass it to passport
	// 		if (user) {
	// 			done(null, user)
	// 		} else {
	// 			// if user does not exist in the database, create one, then pass it to passport
	// 			db_user.create({
	// 				name: profile.displayName,
	// 				email: profile.emails[0].value,
	// 				'google.id': profile.id // object keys with a dot need quotes
	// 			}).then(function(user_created) {
	// 				done(null, user_created)
	// 			}).catch(function(err) {
	// 				return done(err)
	// 			})
	// 		}
	// 	})
	// }))


};
