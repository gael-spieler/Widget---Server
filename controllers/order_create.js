const db_order = require('../models/order')
const stripe = require('stripe')(process.env.STRIPE_SECRET);


module.exports = function(req, res, next) {

    stripe.orders.create(req.body).then(function(new_order){

        // Token is created using Checkout or Elements!
        // Get the payment token ID submitted by the form:
        const token = req.body.stripeToken; // Using Express

        stripe.orders.pay(new_order.id, {
            source: token,
        });

        const order_to_db = {};
        order_to_db.provider = req.body.provider;
        order_to_db.customer = req.body.customer;
        order_to_db.stripe_order_id = req.body.stripeToken;
        order_to_db.sku_id = req.body.items.parent;
        
        db_order.create(order_to_db).then(function(new_order) {
            res.status(200).json(new_order)
        }).catch(next)
    });
}




//
// const order = stripe.orders.create({
//     currency: 'usd',
//     email: 'jenny.rosen@example.com',
//     items: [
//         {
//             type: 'sku',
//             parent: 'sku_F7WcwhLu1JqXq5',
//             quantity: 2,
//         },
//     ],
//     shipping: {
//         name: 'Jenny Rosen',
//         address: {
//             line1: '1234 Main Street',
//             city: 'San Francisco',
//             state: 'CA',
//             postal_code: '94111',
//             country: 'US',
//         },
//     },
// });
