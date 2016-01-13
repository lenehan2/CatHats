var router = require('express').Router();

var Product = require('mongoose').model('Product');

router.get('/', function (req, res, next) {
    req.user.populateCart()
        .then(user => res.status(200).json(user.cart))
        .then(null, next);
});

router.post('/',function(req,res,next){
    req.user.addToCart(req.body)
        .then(user => user.populateCart())
        .then(user => res.status(201).json(user.cart))
        .then(null, next)
});

router.put('/', function (req, res, next) {
    req.user.cart = req.body;
    req.user.save()
        .then(user => user.populateCart())
        .then(user => res.status(201).json(user.cart))
        .then(null, next)
});

module.exports = router;
