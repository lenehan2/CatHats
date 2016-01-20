var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');

/*****
admin/users -> gets all users, individual user w/ id, and all
of a specific users orders

admin/orders -> can update status of specific order
***/
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
			console.log("THIS SHOULDNT BE HIT")
			var err = new Error('Not Found');
			err.status = 404
			next(err)
		}else{
			req.foundUser = user;
			next();
		}
	})
})

router.param('orderId',function(req,res,next,id){
	Order.findById(id)
	.then(order => {
		if(!order){
			console.log(":(")
			var err = new Error('Not Found');
			err.status = 404
			next(err)
		}else{
			console.log(":)", req.foundOrder)
			req.foundOrder = order;
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

//GET ALL ORDERS AS ADMIN

router.get('/orders', function(req, res, next){
	var params = req.query || {};
	console.log("Params from admin:65: ",params)
	Order.find(params).exec()
		.then(orders => res.status(200).json(orders))
		.then(null, next)
})

//GET A SPECIFIC USER AS ADMIN

router.get('/users/:id',function(req, res, next){
	res.status(200).json(req.foundUser)
})

//GET ORDERS BY USER

router.get('/users/:id/orders',function(req,res,next){
	Order.find({ user: req.params.id })
		.then(orders => res.json(orders))
		.then(null, next);
});

//Get an order by ID

router.get('/orders/:orderId',function(req,res,next){
	console.log('order: ', req.foundOrder)
	res.status(200).send(req.foundOrder)
});



//Allows an admin to update a users information, including isAdmin!

router.put('/users/:id', function(req, res, next) {
    Object.keys(req.body).forEach(function(key) {
        req.foundUser[key] = req.body[key];
    });
    req.foundUser.save()
    .then(user => res.status(204).json(req.foundUser))
});

//Allows an admin to delete a user
router.delete('/users/:id', function (req, res, next) {
	User.remove({ _id: req.params.id })
		.then(() => res.status(204).send())
		.then(null, next);
});

//An admin can Update the status of any order

router.put('/orders/:orderId', function (req, res, next) {
	console.log("IN HERE")
    console.log(req.order)
    var err = new Error('Not A valid order status');
    err.status = 403;
    if (req.body.status) {
        req.foundOrder.status = req.body.status;
        req.foundOrder.save()
            .then((order) => {
            	console.log("UPDATED ORDER: ", order)
            	res.status(200).json(order)
            })
            .then(null, next);
    } else {
        next(err);
    }

});



module.exports = router;
