var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product');

router.get('/', function (req, res, next) {
    Product.find()
    .then(products => res.json(products))
    .then(null, next);
});

router.param('id', function (req, res, next, id) {
    Product.findById(id)
        .then(product => {
            if (!product) {
                var err = new Error('Not found');
                err.status = 404;
                next(err);
            } else {
                req.product = product;
                next();
            }
        })
        .then(null, next);
});

router.get('/:id', function (req, res, next) {
    res.json(req.product);
});

router.post('/', function (req, res, next) {
    Product.create(req.body)
        .then(product => res.json(product))
        .then(null, next);
});

router.delete('/:id', function (req, res, next) {
    Product.remove(req.product)
        .then(() => res.status(204).send())
        .then(null, next);
});



module.exports = router;
