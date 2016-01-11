var mongoose = require('mongoose');

var categories = [];

var schema = new mongoose.Schema({

	products: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Product'
	}],
	orderDate: {
		type: Date,
		default: Date.now
	},
	user: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Order'
	},
	ordered: {
		type: Boolean,
		default: false
	}
});

mongoose.model('Order', schema);