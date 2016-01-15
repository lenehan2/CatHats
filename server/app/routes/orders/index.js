var router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');

var Product = mongoose.model('Product');
var Order = mongoose.model('Order');

router.param('id', function (req, res, next, id) {
    Order.findById(id)
        .populate('products.product')
        .then(order => {
            console.log(order);
            if (!order) {
                var err = new Error('Order not found');
                err.status = 404;
                return next(err);
            }
            req.order = order;
            next();
        })
        .then(null, next);
});

router.get('/', function(req, res, next) {
    res.status(200).send('Nothing here ya dang dingus');
});

router.get('/:id', function (req, res, next) {
    console.log('line 26: ', req.order);
    res.status(200).json(req.order);
});

router.post('/', function (req, res, next) {
    var order;

    Order.create(req.body)
        .then(newOrder => {
            order = newOrder;
            if (!req.user) return req.session.cart = {};

            req.user.cart = {};
            return req.user.save();
        })
        .then(() => res.status(201).json(order))
        .then(null, next);
});

//route to cancel an order
router.put('/:id', function (req, res, next) {
    var err = new Error('Not authorized');
    err.status = 403;

    if (!req.user) return next(err);
    if (!req.user.isAdmin) return next(err);
    if (req.user._id !== req.order.user) return next(err);

    if (req.body.status === 'cancelled') {
        req.order.status === 'cancelled';
        req.order.save()
            .then((order) => res.status(200).json(order))
            .then(null, next);
    } else {
        next(err);
    }

});

module.exports = router;
