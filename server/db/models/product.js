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
	categories: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	}],
	inventory: {
		type: Number,
		min: 0
	},
	imageUrl: {
		type: String,
        default: 'http://haliaxservice.com/admin/collection/job/job_020715140720_default.jpeg'
	},
	reviews: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Review'
	}],
	featured: {
		type: Boolean,
		default: false
	}
});

// schema.pre('save', function(next){
// 	this.categories.populate
// })

mongoose.model('Product', schema);