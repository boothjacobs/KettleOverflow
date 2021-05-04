const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { loginUser, logoutUser } = require('../auth')
const { check, validationResult } = require('express-validator');
const { User } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');

// router.use(restoreUser);

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', csrfProtection, asyncHandler(async (req, res) => {
  const user = await User.build();
  res.render('login', {
    csrfToken: req.csrfToken(),
    title: "Login Page",
    user
  })
}));

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

  let errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const user = await User.findOne({ where: { username } });

    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
      if (passwordMatch) {
        loginUser(req, res, user);
        console.log(req.session, '--------------------')
        req.session.save(() => {
          console.log(req.session, '??????????????????????????')
          res.redirect("/")
        });
      }
      else {
        errors.push("Login failed for the provided username and password.")
        res.render('login', { errors, title: "Login Page", csrfToken: req.csrfToken() })
      }
    }
    else {
      errors.push("Login failed for the provided username and password.")
      res.render('login', { errors, title: "Login Page", csrfToken: req.csrfToken() })
    }
  }
  else {
    errors = validatorErrors.array().map((error) => error.msg);
    res.render('login', { errors, title: "Login Page", csrfToken: req.csrfToken() })
  }
  // errors = validatorErrors.array().map((error) => error.msg);
  // res.render('login', { errors, title: "Login Page", csrfToken: req.csrfToken() })
}));

router.get('/signup', csrfProtection, asyncHandler(async (req, res) => {
  const user = await User.build();
  res.render('signup', {
    csrfToken: req.csrfToken(),
    title: "Sign Up Page",
    user
  });
}));

const signupValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email')
    .isLength({ max: 50 })
    .withMessage('Email must not be more than 50 characters long'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please confirm Password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    })
];

router.post('/signup', csrfProtection, loginValidators, signupValidators, asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.build({ username, email });

  //bcrypt
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser(req, res, user);
    req.session.save(() => res.redirect("/"));
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('signup', {
      title: 'Sign Up',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }

  // res.redirect('/');
}));

router.post("/logout", (req, res) => {
  logoutUser(req, res);
  req.session.save(() => res.redirect("/"));
});


module.exports = router;
