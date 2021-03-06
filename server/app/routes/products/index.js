var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product');
var Review = mongoose.model('Review');

router.param('id', function (req, res, next, id) {
    Product.findById(id).populate('categories')
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

//GET ALL
router.get('/', function (req, res, next) {

    //convert title query to regex so it can get partial matches
    if (req.query.title) req.query.title = new RegExp(req.query.title, 'gi');

    Product.find(req.query).populate('categories')
        .then(products => {
            return products;
        })
        .then(products => res.json(products))
        .then(null, next);
});

//ADD REVIEW TO PRODUCT
router.post('/:id/reviews', function(req, res, next){
    req.body.user = req.user._id;
    Review.findOne({user: req.body.user, product: req.params.id})
    .then(function(review){
        if(review){
            var err = new Error("You already posted a review, ya dingus!");
            err.status = 401;
            return next(err);
        }
        Review.create(req.body)
        .then(product => res.json(product))
        .then(null, next);
    })
});

router.get('/:id/reviews', function(req, res, next){
    Review.find({product: req.params.id })
    .populate("user")
    .then(reviews => res.json(reviews))
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
