var router = require('express').Router();
var mongoose = require('mongoose');

var Order = mongoose.model('Order');

router.use('/cart', function(req, res, next) {
    // if (req.user) {
    //     req.user.findOrCreateCart()
    //         .then(function(cart) {
    //             req.cart = cart;
    //             next();
    //         },next);
    // } else if (!req.session.cartId) {
    //     Order.create({})
    //         .then(function(order) {
    //             req.session.cartId = order._id;
    //             req.cart = order;
    //             res.send('Created');
    //             next();
    //         },next);
    // } else {
    //     Order.findById(req.session.cartId)
    //         .then(function(order) {
    //         	req.cart = order;
    //            	next();
    //         },next);
    // }
    if (req.user) {
        req.cart = req.user.cart
    } else{
    	req.session.cart = req.session.cart || [];
    }

});

router.get('/', function(req, res, next) {
    res.status(200).send('Nothing here ya dang dingus');
});

router.get('/cart/addToCart/:id',function(req,res,next){
	req.cart.addProduct(req.params.id)
	.then(function(cart){
		res.status(201).json(cart)
	},next)
});

router.get('/cart', function(req, res, next) {




    res.status(200).json(req.cart);

});


module.exports = router;
