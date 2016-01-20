var router = require('express').Router();
var Category = mongoose.model('Category');

router.get('/', function(req, res, next){
	Category.find()
		.then(categories => res.json(categories))
		.then(null, next);
});

module.exports = router;