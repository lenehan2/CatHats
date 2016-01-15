var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product');
var Review = mongoose.model('Review');

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

router.get('/', function (req, res, next) {
    Product.find(req.query)
        .then(products => res.json(products))
        .then(null, next);
});

//ADD REVIEW TO PRODUCT
router.post('/:id/reviews', function(req, res, next){
    Review.create(req.body)
        .then(product => res.json(product))
        .then(null, next);
});

router.get('/:id', function (req, res, next) {
    res.json(req.product);
});

//check if the current user is an admin
//all routes below this require admin priveleges
router.use(function (req, res, next) {
    if (!req.user || !req.user.isAdmin) {
        let err = new Error('Not authorized');
        err.status = 403;
        next(err);
    } else {
        next();
    }
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

router.put('/:id', function (req, res, next) {
    Object.keys(req.body).forEach(function (key) {
        req.product[key] = req.body[key];
    });
    req.product.save()
        .then(product => res.json(product))
        .then(null, next);
});

module.exports = router;
