var mongoose = require('mongoose');

var categories = ['Seasonal','Costumes','Formal','Outerware'];

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
	imageUrl: {
		type: String
	},
	reviews: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Review'
	}]
});

mongoose.model('Product', schema);