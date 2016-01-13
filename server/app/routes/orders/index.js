var router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');

var Order = mongoose.model('Order');
var User = mongoose.model('User');
var Product = mongoose.model('Product');

router.get('/', function(req, res, next) {
    res.status(200).send('Nothing here ya dang dingus');
});

router.get('/cart/addToCart/:id',function(req,res,next){
    if (req.user) {
        req.user.cart.push(req.params.id);
        req.user.save()
            .then(user => {
                user.populate('cart', function (err, user) {
                    res.status(201).json(user.cart);
                });
            })
    } else {
        req.session.cart = req.session.cart || [];
        req.session.cart.push(req.params.id);
        var promises = req.session.cart.map(productId => {
            return Product.findById(productId);
        });

        Promise.all(promises)
            .then(products => {
                res.status(201).json(products);
            })
    }
});

router.get('/cart', function(req, res, next) {
    if (req.user) {
        res.status(200).send(req.user.cart);
    } else {
        res.status(200).send(req.session.cart);
    }

});

router.post('/cart/addToCart',function(req,res,next){
    if(req.user)
    console.log("HIT THIS: ",req.body)
    res.status(201).send("req.body")
})


module.exports = router;
