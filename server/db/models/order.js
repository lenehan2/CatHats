var mongoose = require('mongoose');
var itemSchema = require('./item');

var schema = new mongoose.Schema({

	products: [itemSchema],
	orderDate: {
		type: Date,
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

schema.methods.addProduct = function(productId){

	this.products.push(productId);
}

mongoose.model('Order', schema);
