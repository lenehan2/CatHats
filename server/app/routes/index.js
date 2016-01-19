'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/cart', require('./cart'));
router.use('/user' , require('./user'));
router.use('/products', require('./products'));
router.use('/admin',require('./admin'));
router.use('/recommendations', require('./recommendations'));

//***Note, orders route is nested inside of user route***///

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
