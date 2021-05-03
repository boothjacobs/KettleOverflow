const express = require('express');
const router = express.Router();
const { User } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', csrfProtection, asyncHandler( async (req, res) => {
  const user = await User.build()
  res.render('login', {
    csrfToken: req.csrfToken(),
    user
  })
}))

module.exports = router;
