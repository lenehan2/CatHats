var router = require('express').Router();
var _ = require('lodash');
var Order = require('mongoose').model('Order');
var Product = require('mongoose').model('Product');

var addToCart = function (newProduct, cart) {
    var existing = cart.find(function (item) {
        return item.product.toString() === newProduct.product.toString();
    });
    if (existing) existing.quantity += newProduct.quantity;
    else cart.push(newProduct);
};

router.use(function (req, res, next) {
    if (req.user) {
        req.cart = req.user.cart;
        console.log("req.cart from use", req.cart);
    } else {
        req.session.cart = req.session.cart || [];
        req.cart = req.session.cart;
    }
    next();
})

router.get('/', function (req, res, next) {
    //when using req.session.cart, the cart must be cloned before its populated
    //otherwise the population causes problems
    var cart = req.user ? req.user.cart : _.cloneDeep(req.session.cart)

    Product.populate(cart, { path: 'product' })
        .then(cart => res.status(200).json(cart))
        .then(null, next);
});

router.post('/',function(req,res,next){
    if (!req.user) {
        addToCart(req.body, req.cart);
        res.send(req.cart);
        populateCart(req.cart)
            .then(cart => res.status(201).json(cart));
    } else {
        req.user.addToCart(req.body)
            .then(user => user.populateCart())
            .then(user => res.status(201).json(user.cart))
            .then(null, next)
    }
});

router.put('/', function (req, res, next) {
    if (!req.user) {
        req.session.cart = req.body;
        populateCart(req.session.cart)
            .then(cart => res.status(201).json(cart));
    } else {
        req.user.cart = req.body;
        req.user.save()
            .then(user => user.populateCart())
            .then(user => res.status(201).json(user.cart))
            .then(null, next)
    }
});

//CREATE NEW ORDER

router.post('/checkout', function (req, res, next) {
    var order;

    Order.create(req.body)
        .then(newOrder => {
            order = newOrder;
            if (!req.user) return req.session.cart = {};

            req.user.cart = [];
            return req.user.save();
        })
        .then(() => res.status(201).json(order))
        .then(null, next);
});

module.exports = router;
