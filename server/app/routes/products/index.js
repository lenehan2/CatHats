var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product');
var Review = mongoose.model('Review');


router.get('/', function (req, res, next) {
    Product.find(req.query)
    .then(products => res.json(products))
    .then(null, next);
});

// router.get('/:category', function(req, res, next){
//     Product.find( { 'category' : req.params.category } )
//     .then(products => {
//         res.status(200).json(products);
//     })
//     .then(null, next);
// })

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
    //ADMIN AUTHENTICATION
    if(!req.user || !req.user.isAdmin){
        return res.status(403).end();
    }

    Product.create(req.body)
        .then(product => res.json(product))
        .then(null, next);
});

router.delete('/:id', function (req, res, next) {
    //ADMIN AUTHENTICATION
    if(!req.user || !req.user.isAdmin){
        return res.status(403).end();
    }

    Product.remove(req.product)
        .then(() => res.status(204).send())
        .then(null, next);
});

router.put('/:id', function (req, res, next) {
    //ADMIN AUTHENTICATION
    if(!req.user || !req.user.isAdmin){
        return res.status(403).end();
    }

    Object.keys(req.body).forEach(function (key) {
        req.product[key] = req.body[key];
    });
    req.product.save()
        .then(product => res.json(product))
        .then(null, next);
});

//ADD REVIEW TO PRODUCT
router.post('/:id/reviews', function(req, res, next){
    Review.create(req.body)
        .then(product => res.json(product))
        .then(null, next);
});

module.exports = router;
