var router = require('express').Router();
var mongoose = require('mongoose');

var Order = mongoose.model('Order');

router.get('/',function(req,res,next){
	res.status(200).send('Nothing here ya dang dingus');
})

router.get('/cart',function(req,res,next){
	
	if(!req.session.cartId){
		Order.create({})
		.then(function(order){
			req.session.cartId = order._id;
			res.send('Created')
		})
	}else{
		Order.findById(req.session.cartId)
		.then(function(order){
			res.status(200).json(order)
		})
	}	


	// res.status(200).json(req.session);

});


module.exports = router;