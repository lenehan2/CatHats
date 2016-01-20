var router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
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
            //Checking to make sure the user isn't looking for a cart 
            //that isn't theirs
            if (!req.user || req.user._id.toString() !== order.user.toString()){
                console.log('Req.user: ',req.user)
                console.log("req.user._id: ", req.user._id)
                console.log("type of req.user._id: ", typeof req.user._id)
                console.log("order.user: ", order.user)
                console.log("type of order: ", typeof order.user)


                var err = new Error('Not Authorized');
                err.status = 403;
                return next(err);
            }
            req.order = order;
            next();
        })
        .then(null, next);
});

//GET CURRENT USERS ORDER HISTORY

router.get('/', function(req, res, next) {
    Order.find({
            user: req.user.id
        })
        .then(orders => res.json(orders))
        .then(null, next);
});

//GET ORDER FOR CURRENT USER BY ID

router.get('/:id', function (req, res, next) {
    console.log('line 26: ', req.order);
    res.status(200).json(req.order);
});


//User can delete an order that belongs to them
router.put('/:id', function (req, res, next) {
    var err = new Error('Not authorized');
    err.status = 403;

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
