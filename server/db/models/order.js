var mongoose = require('mongoose');
var orderItemSchema = require('./orderItem');
var addressSchema = require('./address');

var schema = new mongoose.Schema({

	products: [orderItemSchema],
    shipping: addressSchema ,
    payment: {
        creditCardNumber: {
            type: String,
            minlength: 16,
            maxlength: 16
        },
        nameOnCard: { type: String },
        csv: { type: String },
        billingAddress: addressSchema
    },
	orderDate: {
		type: Date,
        default: Date.now
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	status: {
		type: String,
		enum: ['created', 'processing', 'cancelled', 'completed'],
        default: 'created'
	}
});

mongoose.model('Order', schema);
