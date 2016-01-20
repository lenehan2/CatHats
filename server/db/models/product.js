var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Promise = require('bluebird');

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

// schema.pre('validate', function(next){
// 	var promises = this.categories.map(function(category){
// 		return Category.find({name: category})
// 			// .then(function(categoryFromDB){
// 			// 	return categoryFromDB._id;
// 			// })
// 	})
// 	Promise.all(promises)
// 		.then(function(categories){
// 			this.categories = categories
// 			next();
// 		})
// })

mongoose.model('Product', schema);
