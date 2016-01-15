var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');


//Maybe we want to set req.foundUser to be null if we don't find
//anything here?  Currently if you manually search for a users id, 
//you can figure out if an ID is valid by whether or not it hangs.
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

router.get('/:id',function(req,res,next){
	res.status(200).json(req.user); //<---Neat, prevents users from accessing other users
});

router.get('/:id/orders',function(req,res,next){
	Order.find({ user: req.params.id })
		.then(orders => res.json(orders))
		.then(null, next);
});

//UPDATE USER ACCOUNT
//Does this allow a logged in user to change another users account?
router.get('/test/:id', function(req,res,next){
	if(!req.user){
        return res.status(403).end();  //NOT SURE IF WORKS!
    }
    console.log(req.user)
    Object.keys(req.body).forEach(function(key){
    	req.foundUser[key] = req.body[key];
    });
    req.foundUser.save()
    .then(user => res.json(user))
    .then(null, next);
});

//Allows an admin to update a users status to admin
router.put('/admin/:id',function(req,res,next){
	if(!req.user || !req.user.isAdmin){
		return res.status(403).end();
	}
	User.findById(req.params.id)
	.then(user => {
		if(user){
			user.isAdmin = true;
		}
		return user;
	}).then(user => res.status(204).json(user))
})

router.post('/', function(req,res,next){
	console.log("HERE",req.body)
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
