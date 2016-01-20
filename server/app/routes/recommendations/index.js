var router = require('express').Router();
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product')
var _ = require('lodash');

router.get('/:productId', function (req, res, next) {
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

module.exports = router;
