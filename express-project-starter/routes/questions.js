const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { requireAuth } = require('../auth') //Need login/ logout
const { check, validationResult } = require('express-validator');
const { Question, User, Answer } = require('../db/models')
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
    const question = await Question.findByPk(req.params.id, {
        include: User
     })
    // console.log(question.content, question.User.id)
    res.render('question', {
        question
    })
}))

module.exports = router;
