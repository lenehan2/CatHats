var mongoose = require('mongoose');

var schema = new mongoose.Schema({

	rating: {
		type: Number,
		min: 1,
		max: 5
	},
	products: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Product'
	}],
	title: {
		type: String,
		required: true
	},
	description: {
		type: String, 
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'
	}
});

mongoose.model('Review', schema);