var mongoose = require('mongoose');
var orderItemSchema = require('./orderItem');
var addressSchema = require('./address');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var swig = require('swig');
var Mandrill = require('../../app/emailConfirmation/mandrill.js');
var path = require('path');
var filePath = path.join(__dirname, '../../app/views/confirmationEmailTemplate.html')

var schema = new mongoose.Schema({

    products: [orderItemSchema],
    shipping: addressSchema,
    payment: {
        creditCardNumber: {
            type: String,
            minlength: 16,
            maxlength: 16
        },
        nameOnCard: {
            type: String
        },
        csv: {
            type: String
        },
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

schema.post('save', function() {
    var self = this;
    var user;
    User.findById(this.user)
        .then(foundUser => user = foundUser)
        .then(user => {

            var email = swig.renderFile(filePath, {
                UserEmail: user.email,
                Date_Ordered: self.orderDate.toString()
                    // Ordered_Products: productsArray,
                    // testing: 'TEST',
            });

            // console.log("email: ", email)
            //un-comment out to get emails to send
            // Mandrill.sendEmail('User','testfullstackproject@gmail.com','CatHats','testfullstackproject@gmail.com','Order Confirmation',email)
        })
})

mongoose.model('Order', schema);
