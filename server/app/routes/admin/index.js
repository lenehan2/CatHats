var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');

router.use(function(req,res,next){
	if(!req.user || !req.user.isAdmin){
		var err = new Error('Nice Try Not-Admin! Now get the hell out of here!');
		err.status = 403;
		next(err);
	}else{
		next();
	}
})

router.param('id',function(req,res,next,id){
	User.findById(id)
	.populate('orders')
	.then(user => {
		if(!user){
			var err = new Error('Not Found');
			err.status = 404
			next(err)
		}else{
			req.foundUser = user;
			console.log(req.foundUser.orders);
			next();
		}
	})
})

//GET ALL USERS AS ADMIN

router.get('/users', function(req, res, next) {
    User.find().exec()
        .then(user => res.status(200).json(user))
        .then(null, next)
})

//GET ORDERS BY USER

router.get('users/:id/orders',function(req,res,next){
	console.log("HIT")
	Order.find({ user: req.params.id })
		.then(orders => res.json(orders))
		.then(null, next);
});

//Allows an admin to update a users status to admin

router.put('/users/:id', function(req, res, next) {
    if (!req.user || !req.user.isAdmin) { //<--Unnecessary?
        return res.status(403).end();
    }
    User.findById(req.params.id)
        .then(user => {
            if (user) {
                user.isAdmin = true;
            }
            return user;
        }).then(user => res.status(204).json(user))
})

module.exports = router;