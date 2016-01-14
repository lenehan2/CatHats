var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    price: { type: Number, min: 0 },
    quantity: { type: Number, min: 0 }
},
{
    _id: false
});

module.exports = schema;
