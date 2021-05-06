const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');


/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('home', { title: 'Kettle Overflow' });
});

module.exports = router;
