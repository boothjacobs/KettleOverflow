const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { requireAuth } = require('../auth') //Need login/ logout
const { check, validationResult } = require('express-validator');
const { Question, User, Answer, sequelize, Sequelize } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');
const { Op } = require("sequelize");

router.get('/', csrfProtection, asyncHandler(async (req, res, next) => {
    const questions = await Question.findAll({
        include: [User],
        order: [['createdAt', 'DESC']],
        limit: 10,
    });

    res.render('home', {
        csrfToken: req.csrfToken(),
        questions
    })
}));

router.post('/', asyncHandler(async (req, res, next) => {
    const { content } = req.body;
    const questions = await Question.findAll({
        include: [User],
        where: {
            content: {
                [Op.substring]: content,
            }
        }
    });

    res.render('home', {
        questions
    });
}));

router.get('/form', requireAuth, csrfProtection, function (req, res, next) {
    res.render('question-form', {
        csrfToken: req.csrfToken(),
        title: "Question Form"
    })
});

router.post('/form', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const { userId } = req.session.auth
    const { content } = req.body;
    await Question.create({
        content,
        userId
    })
    res.redirect('/')
}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const question = await Question.findByPk(
        req.params.id,
        { include: [Answer, User] },
    )
        console.log(res.locals.user.id)
    res.render('question', {
        question,
    })
}))

router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
    const questionId = req.params.id

    const question = await Question.findByPk(questionId)
    question.content = req.body.content
    await question.save()
    res.sendStatus(201)
}))

module.exports = router;
