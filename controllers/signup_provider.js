const db_provider = require('../models/provider');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');

module.exports = function(req, res, next) {
    console.log("req body from form", req.body)

    // transform email to lowercase

    if (req.body.email) {
        req.body.email = req.body.email.toLowerCase()
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    // if email is taken, reject, otherwise create the provider
    db_provider.findOne({
        email: req.body.email
    }).then(function(provider) {
        // make sure email is unique
        if (provider) {
            return next({
                message: 'Provider already exists'
            })
        }
        // if email does not exist, create the provider
        db_provider.create(req.body).then(function(provider) {
            provider.widget_script = `<iframe style="z-index:9000; position:fixed; bottom:3%;right:3%;width:100vw;height:100vh" src="${process.env.WIDGET_URL}/${provider._id}"></iframe>`
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: provider.email,
                from: process.env.EMAIL_ADDRESS,
                subject: 'Welcome to Platboo',
                // text: 'and easy to do anywhere, even with Node.js',
                html: `<strong>Dear ${provider.first_name}, </b> thank you for signing up with Platboo! Your business has just become bookable! All you need to do is to insert the following of code into your website: ${provider.widget_script}</strong>`
            };
            sgMail.send(msg);
            res.status(200).json(provider);
        }).catch(next)
    }).catch(next)
};
