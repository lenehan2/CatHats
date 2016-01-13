var router = require('express').Router();
var _ = require('lodash');

var Product = require('mongoose').model('Product');
//
// schema.methods.populateCart = function () {
//     var user = this;
//
//     return Product.populate(user, { path: 'cart.product' }, function (err, user) {
//         if (err) throw err;
//         return user;
//     });
// };

var populateCart = function (cart, req) {
    cart = _.cloneDeep(cart);

    return Product.populate(cart, { path: 'product '}, function (err, cart) {
        if (err) throw err;
        console.log('cart :19 ', cart);
        return cart;
    });
};

var addToCart = function (newProduct, cart) {
    console.log('new product: ', newProduct);
    var existing = cart.find(function (item) {
        return item.product.toString() === newProduct.product.toString();
    });
    if (existing) existing.quantity += newProduct.quantity;
    else cart.push(newProduct);
};

router.use(function (req, res, next) {
    if (req.user) {
        req.cart = req.user.cart;
    } else {
        req.session.cart = req.session.cart || [];
        req.cart = req.session.cart;
    }
    next();
})

router.get('/', function (req, res, next) {
    if (!req.user) {
        populateCart(req.cart)
            .then(cart => res.status(200).json(cart))
            .then(null, next);
    } else {
        req.user.populateCart()
            .then(user => res.status(200).json(user.cart))
            .then(null, next);
    }
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

module.exports = router;
