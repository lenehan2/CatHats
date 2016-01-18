var router = require('express').Router();
var _ = require('lodash');
var fs = require('fs');
var Order = require('mongoose').model('Order');
var Product = require('mongoose').model('Product');
var Promise = require('bluebird');
var userMethods = require('mongoose').model('User').schema.methods;

router.use(function (req, res, next) {

    if (req.user) return next();
    // If there's no user logged in, prepare the session object
    // w/ methods for managing the cart
    //TODO see if we can do this when the session is initialized instead

    // If there's no session cart, initialize the cart as an empty array
    req.session.cart = req.session.cart || [];

    // Give the session addToCart and updateCart methods that mimic
    // what's on the User schema
    // These methods are promisified so we can use them the same way
    // as the User methods
    if (!req.session.addToCart) {
        req.session.addToCart = Promise.method(function (newCart) {
            userMethods.addToCart.call(req.session, newCart);

            // The req.session object must be cloned so we can populate it with data
            // from the db without messing it up for future requests
            return _.cloneDeep(req.session);
        });
    }

    if (!req.session.updateCart) {
        req.session.updateCart = Promise.method(function (newCart) {
            userMethods.updateCart.call(req.session, newCart);
            return _.cloneDeep(req.session);
        });
    }

    next();
})

router.get('/', function (req, res, next) {
    // When using req.session.cart, the cart must be cloned before it's
    // populated, otherwise the population causes problems
    var cart = req.user ? req.user.cart : _.cloneDeep(req.session.cart)

    Product.populate(cart, { path: 'product' })
        .then(cart => res.status(200).json(cart))
        .then(null, next);
});

router.post('/',function(req,res,next){
    var user = req.user ? req.user : req.session;
    user.addToCart(req.body)
        .then(user => user.cart)
        .then(cart => Product.populate(cart, { path: 'product' }))
        .then(cart => res.status(200).json(cart))
        .then(null, next);
});

router.put('/', function (req, res, next) {
    var user = req.user ? req.user : req.session;

    user.updateCart(req.body)
        .then(user => user.cart)
        .then(cart => Product.populate(cart, { path: 'product' }))
        .then(cart => res.status(201).json(cart))
        .then(null, next);

});

//CREATE NEW ORDER

router.post('/checkout', function (req, res, next) {
    var order;

    Order.create(req.body)
        .then(newOrder => {
            order = newOrder;
            if (!req.user) return req.session.cart = [];

            req.user.cart = [];
            // Mandrill.sendEmail('User','john.m.lenehan@gmail.com','CatHats','testfullstackproject@gmail.com','Order Confirmation',messageTemplate)
            return req.user.save();
        })
        .then(() => res.status(201).json(order))
        .then(null, next);
});

module.exports = router;
