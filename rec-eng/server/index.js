require('./db');
var express = require('express');
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var _ = require('lodash');
var cors = require('cors');

var app = express();
var port = process.env.REC_PORT || 8080;

app.get('/api/recommendations/:productId', function (req, res, next) {
    console.log("Hello from 8080");
    Order.find()
        .where('products.product', req.params.productId)
        .then(orders => res.json(
                parseOrders(req.params.productId, orders)
            )
        )
        .then(null, next);
});

function parseOrders (productId, orders) {
    var hash = {};

    orders.forEach(function (order) {
        order.products.forEach(function (orderProduct) {
            if (orderProduct.product.toString() === productId) return;

            if (hash[orderProduct.product]) hash[orderProduct.product]++;
            else hash[orderProduct.product] = 1;
        });
    });

    var sorted = Object.keys(hash).sort((a, b) => hash[b] - hash[a]).slice(0, 3);

    return sorted;
}

app.listen(port, function () {
    console.log('Rec Engine app listening on port ', port);
});
