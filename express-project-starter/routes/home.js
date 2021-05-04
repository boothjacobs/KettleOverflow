const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("We are on the home page ------------", res.locals.authenticated)
  res.render('home', { title: 'Welcome Home' });
});

module.exports = router;
