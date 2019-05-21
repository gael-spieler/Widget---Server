const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const connect_mongodb = require('connect-mongodb-session')(session);

const app = express();
require('dotenv').config();

// middleware

app.use(body_parser.json());
app.use(body_parser.urlencoded({ // understands form submits
	extended: true
}));
app.use(cors());

const session_store = new connect_mongodb({
	uri: process.env.MONGODB_URL,
	collection: 'sessions'
});

app.use(session({
	secret: process.env.SESSION_SECRET,
	unset: 'destroy',
	resave: true,
	rolling: true,
	saveUninitialized: true,
	store: session_store,
	cookie: {
		maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week in milliseconds
	}
}));

// Auth
require('./auth.js')(app);
// Routes
require('./routes-api.js')(app);
// Errors
app.use(function(err, req, res, next) {
	console.log('err', err);
	res.status(400).json({
		message: err.message
	})
})

app.listen(process.env.PORT, function() {
	console.log(`Server ready on port ${process.env.PORT} or default`);
})
