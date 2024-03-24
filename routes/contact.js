var express = require('express');
var router = express.Router();
const Order = require('../models/Order'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});




module.exports = router;
