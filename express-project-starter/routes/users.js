const express = require('express');
const router = express.Router();
const { loginUser } = require('../auth')
const { check, validationResult } = require('express-validator');
const { User } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', csrfProtection, asyncHandler(async (req, res) => {
  const user = await User.build()
  res.render('login', {
    csrfToken: req.csrfToken(),
    user
  })
}))

const loginValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Username')
    .isLength({ max: 20 })
    .withMessage('Username must not be more than 20 characters long'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
];

router.post('/login', csrfProtection, loginValidators, asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } })

  loginUser(req, res, user);
  res.redirect('/');

}))

module.exports = router;
