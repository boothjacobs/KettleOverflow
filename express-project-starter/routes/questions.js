const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { requireAuth } = require('../auth') //Need login/ logout
const { check, validationResult } = require('express-validator');
const { Question } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');

router.get('/', requireAuth, csrfProtection, function (req, res, next) {
    res.render('questions', {
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


module.exports = router;
