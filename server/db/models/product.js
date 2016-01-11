var mongoose = require('mongoose');

var categories = [];

var schema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	category: [{
		type: String,
		enum: categories
	}],
	inventory: {
		type: Number,
		min: 0
	},
	imageUrls: [{
		type: String
	}],
	reviews: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Review'
	}]
});

mongoose.model('Product', schema);