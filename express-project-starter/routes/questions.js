const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { requireAuth } = require('../auth') //Need login/ logout
const { check, validationResult } = require('express-validator');
const { Question, User, Answer, sequelize, Sequelize } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');

router.get('/', requireAuth, csrfProtection, function (req, res, next) {
    res.render('question-form', {
        csrfToken: req.csrfToken(),
        title: "Question Form"
    })
});

router.post('/', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const { userId } = req.session.auth
    const { content } = req.body;
    await Question.create({
        content,
        userId
    })
    res.redirect('/')
}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const question = await Question.findByPk(req.params.id,
        { include: [Answer, User] },
    )
    console.log(res.locals.user.id)
    console.log(question.userId)
    res.render('question', {
        question,
    })
}))

router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
    const questionId = req.params.id

    const question = await Question.findByPk(questionId)
    console.log(question.content, 'BEFORE CHANGE')
    console.log(req.body, 'CHANGE TO THIS')
    question.content = req.body.content
    await question.save()
    console.log(question.content, '------------------------')
    res.sendStatus(201)
}))

module.exports = router;
