var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
},
{
    _id: false
});

module.exports = schema;
