const express = require('express');
const router = express.Router();
const { Question, User, Answer, sequelize, Sequelize } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   // console.log("We are on the home page ------------", res.locals.authenticated)
//   res.render('home', { title: 'Kettle Overflow' });
// });

router.get('/', csrfProtection, asyncHandler(async (req, res, next) => {
    const questions = await Question.findAll({
        include: [ User ],
        order: [['createdAt', 'DESC']],
        limit: 10,
    });

    res.render('home', {
        title: 'Kettle Overflow',
        csrfToken: req.csrfToken(),
        questions
    })
}));

module.exports = router;
