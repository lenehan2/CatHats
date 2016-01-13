var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var _ = require('lodash');

router.param('id',function(req,res,next,id){
	User.findById(id).exec()
	.then(user => {
		if(!user){
			var err = new Error('Not Found');
			err.status(404)
			next(err)
		}else{
			console.log(user)
			req.user = user;
			next();
		}
	})
})

router.get('/',function(req,res,next){
	User.find().exec()
	.then(user => res.status(200).json(user))
	.then(null,next)
});

router.get('/:id',function(req,res,next){
	res.status(200).json(req.user);
});

router.get('/:id/orders',function(req,res,next){
	res.status(200).json(req.user.orders);
});

//UPDATE USER ACCOUNT
router.put('/:id', function(req,res,next){
	if(!req.user){
        res.status(403).end();  //NOT SURE IF WORKS!
    }
    Object.keys(req.body).forEach(function(key){
    	req.user[key] = req.body[key];
    });
    req.user.save()
    .then(user => res.json(user))
    .then(null, next);
});

router.post('/createAccount', function(req,res,next){
	User.create(req.body)
	.then(user => res.json(user))
	.then(null, next);
});

module.exports = router