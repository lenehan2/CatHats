var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');

//***REMOVED BASIC USERS ABILITY TO FIND OTHER USER BY ID****//


//NON AUTHENTICATED USERS DON'T HAVE ACCESS TO THIS ROUTE
router.use('/', function(req, res, next) {
    if (!req.user) {
        var err = new Error('Not Found');
        err.status = 404
        next(err)
    }else{
    	next()
    }
})

//Get current User

router.get('/', function(req, res, next) {
    res.status(200).json(req.user); //<---Neat, prevents users from accessing other users
});

//GET CURRENT USERS ORDER HISTORY

router.get('/orders', function(req, res, next) {
    Order.find({
            user: req.user.id
        })
        .then(orders => res.json(orders))
        .then(null, next);
});

//UPDATE CURRENT USER ACCOUNT

router.put('/', function(req, res, next) {
    if (!req.user) {
        return res.status(403).end(); //NOT SURE IF WORKS! <--May be taken care of with use up top
    }
    Object.keys(req.body).forEach(function(key) {
        req.user[key] = req.body[key];
    });
    req.user.save()
        .then(user => res.json(user))
        .then(null, next);
});

router.post('/', function(req, res, next) {
	//This ensures that a user can't make themselves an admin
	req.body.isAdmin = false;

    User.create(req.body)
        .then(user => {
            req.logIn(user, function(loginErr) {
                if (loginErr) return next(loginErr);
                // We respond with a response object that has user with _id and email.
                if (req.session.cart) {
                    req.user.syncCart(req.session.cart)
                        .then(function() {
                            req.session.cart = null;
                            res.status(200).send({
                                user: user.sanitize()
                            });
                        })
                } else {
                    res.status(200).send({
                        user: user.sanitize()
                    });
                }
            });
        })
        .then(null, next);
});

module.exports = router
