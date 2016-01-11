var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');


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
})

module.exports = router