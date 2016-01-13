var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity: { type: Number, min: 0 }
});

module.exports = schema;
