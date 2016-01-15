var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');

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

//GET ALL USERS
router.get('/',function(req,res,next){
	if(!req.user || !req.user.isAdmin){
		var err = new Error('Nice Try Not-Admin! Now get the hell out of here!');
		err.status = 403;
		next(err);
	} else {
		User.find().exec()
		.then(user => res.status(200).json(user))
		.then(null,next)}
});

router.get('/:id',function(req,res,next){
	res.status(200).json(req.user);
});

router.get('/:id/orders',function(req,res,next){
	Order.find({ user: req.params.id })
		.then(orders => res.json(orders))
		.then(null, next);
});

//UPDATE USER ACCOUNT
router.put('/:id', function(req,res,next){
	if(!req.user){
        return res.status(403).end();  //NOT SURE IF WORKS!
    }
    Object.keys(req.body).forEach(function(key){
    	req.foundUser[key] = req.body[key];
    });
    req.foundUser.save()
    .then(user => res.json(user))
    .then(null, next);
});

router.post('/', function(req,res,next){
	User.create(req.body)
		.then(user => {
			req.logIn(user, function (loginErr) {
				if (loginErr) return next(loginErr);
				// We respond with a response object that has user with _id and email.
				if(req.session.cart){
					req.user.syncCart(req.session.cart)
					.then(function(){
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
