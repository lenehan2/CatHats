'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
// var Order = mongoose.model('Order');
var Product = mongoose.model('Product');
var itemSchema = require('./item');

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: [itemSchema],
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    }
});

// method to remove sensitive information from user objects before sending them out
schema.methods.sanitize = function() {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

// schema.methods.findOrCreateCart = function(){
//     var self = this;

//     return this.populate('orders')
//     .then(function(user){
//         var cart = user.orders.find(function(order){
//             return !order.ordered;
//         })
//         if(cart){
//             return cart;
//         }else{
//             Order.create({})
//             .then(function(cart){
//                 self.orders.push(cart._id);
//                 return cart;
//             })
//         }
//     })
// }

schema.methods.syncCart = function(productArr){

    var self = this;
    productArr.forEach(function(newProduct){
        var existing = self.cart.find(function (item) {
            return item.product.toString() === newProduct.product.toString();
        });
        if (existing) existing.quantity += newProduct.quantity;
        else self.cart.push(newProduct);
    })

    return this.save();

}

schema.methods.addToCart = function (newProduct) {

    var existing = this.cart.find(function (item) {
        return item.product.toString() === newProduct.product.toString();
    });
    if (existing) existing.quantity += newProduct.quantity;
    else this.cart.push(newProduct);
    // console.log("newProduct", newProduct);
    // console.log("typeof newProduct.id", typeof newProduct.id);
    // console.log("this.cart", this.cart)
    return this.save();
};

schema.methods.populateCart = function () {
    var user = this;

    return Product.populate(user, { path: 'cart.product' }, function (err, user) {
        if (err) throw err;
        return user;
    });
};

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function() {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function(next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function(candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);
