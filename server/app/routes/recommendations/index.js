var router = require('express').Router();
var cors = require('cors');

router.get('/:id', cors(), function(req, res, next){
	res.redirect('localhost:8080/api/recommendations/' + req.params.id);
});

module.exports = router;