require('./db');
var express = require('express');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product')
var _ = require('lodash');

var app = express();
var port = process.env.REC_PORT || 8080;

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/api/recommendations/:productId', function (req, res, next) {
    Order.find()
        .where('products.product', req.params.productId)
        .then(orders => {
            var products = {};
            products.productId = parseOrders(req.params.productId, orders);
            return Product.populate(products, { path: 'productId' });
        })
        .then(products => {
            res.json(products.productId);
        })
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
