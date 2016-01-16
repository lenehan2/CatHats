'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var Order = mongoose.model('Order');
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

schema.methods.findOrCreateCart = function(){
    var self = this;

    return this.populate('orders')
    .then(function(user){
        var cart = user.orders.find(function(order){
            return !order.ordered;
        })
        if(cart){
            return cart;
        }else{
            Order.create({})
            .then(function(cart){
                self.orders.push(cart._id);
                return cart;
            })
        }
    })
}

//addToCart can take either a single item or an array of items
schema.methods.addToCart = function (newItems) {
    if (!Array.isArray(newItems)) newItems = [newItems];

    newItems.forEach(newItem => {
         var existing = this.cart.find(cartItem => {
            return cartItem.product.toString() === newItem.product.toString();
        });
        if (existing) existing.quantity += newItem.quantity;
        else this.cart.push(newItem);
    });
    return this.save();
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
