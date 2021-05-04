const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const { restoreUser } = require('../auth');

router.use(restoreUser);

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.auth)
  res.render('home', { title: 'a/A Express Skeleton Home' });
});

module.exports = router;
