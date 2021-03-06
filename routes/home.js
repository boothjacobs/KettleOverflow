const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const { Question, User, Answer, sequelize, Sequelize } = require('../db/models')

/* GET home page. */
// router.get('/', function(req, res, next) {

//   res.render('home', { title: 'Kettle Overflow' });
// });

router.get('/', csrfProtection, asyncHandler(async (req, res, next) => {
    const questions = await Question.findAll({
        include: [ User ],
        order: [['createdAt', 'DESC']],
        limit: 10,
    });
    const number = Math.ceil(Math.random() * 5).toString()
    // console.log(number, '-----------------------------')
    res.render('home', {
        title: 'Kettle Overflow',
        csrfToken: req.csrfToken(),
        questions,
        number
    })
}));

router.get('/about', asyncHandler(async (req, res) => {
    res.render('about', {
        title: 'About'
    })
}))

module.exports = router;
