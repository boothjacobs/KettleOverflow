const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'a/A Express Skeleton Home' });
});

module.exports = router;
