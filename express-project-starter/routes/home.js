const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("We are on the home page ------------", req.session)
  res.render('home', { title: 'a/A Express Skeleton Home' });
});

module.exports = router;
