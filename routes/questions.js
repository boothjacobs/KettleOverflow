const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { requireAuth } = require('../auth') //Need login/ logout
const { check, validationResult } = require('express-validator');
const { Question, User, Answer, QuestionVote, sequelize, Sequelize } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');
const { Op } = require("sequelize");

async function questionUpvotes(questionId) {
    const upVoteTally = await QuestionVote.count({
        where: {
            [Op.and]: [ { questionId }, { upVote: true } ]
        }
    });
    return upVoteTally;
};
async function questionDownvotes(questionId) {
    const downVoteTally = await QuestionVote.count({
        where: {
            [Op.and]: [
                { questionId },
                { upVote: false },
            ]
        }
    });
    return downVoteTally;
};
async function voteExists(questionId, userId) {
    const answer = await QuestionVote.findOne({
        where: {
            [Op.and]: [
                { questionId },
                { userId },
            ]
        }
    });
    return answer;
};

router.get('/', csrfProtection, asyncHandler(async (req, res, next) => {
    const questions = await Question.findAll({
        include: [User],
        order: [['createdAt', 'DESC']],
        limit: 10,
    });

    res.render('home', {
        csrfToken: req.csrfToken(),
        questions,
        title: 'Questions page'
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

const questionValidators = [
    check('content')
      .exists({ checkFalsy: true })
      .withMessage('The question field can not be empty')
      .isLength({ min: 10 })
      .withMessage('Question must be at least 10 characters long'),
  ];

router.post('/form', requireAuth, csrfProtection, questionValidators, asyncHandler(async (req, res) => {
    const { userId } = req.session.auth
    const { content } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await Question.create({
            content,
            userId
        })
        res.redirect('/')
    }
    else {
      errors = validatorErrors.array().map((error) => error.msg);
      res.render('question-form', { errors, title: "Question Form", csrfToken: req.csrfToken() })
    }


}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const question = await Question.findByPk(req.params.id,
        { include: [Answer, User] })

    const upvotes = await questionUpvotes(req.params.id);
    const downvotes = await questionDownvotes(req.params.id);

    let title;
    if (!question) {
        title = 'Nothing To See Here'
    }
    else {
        title = question.content
    }

    res.render('question', {
        question,
        title,
        upvotes,
        downvotes
    })
}));

router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
    const questionId = req.params.id;

    const question = await Question.findByPk(questionId);
    question.content = req.body.content;
    await question.save();
    res.sendStatus(201);
}));

router.post('/:id(\\d+)/answers', requireAuth, asyncHandler(async (req, res) => {
    const { userId } = req.session.auth
    const questionId = req.params.id
    const { content } = req.body;
    await Answer.create({
        content,
        userId,
        questionId
    })

    res.redirect(`/questions/${questionId}`)
}))


router.post('/:id/votes', asyncHandler(async (req, res) => {
    const questionId = req.params.id;
    const { userId } = req.session.auth;
    const { vote } = req.body;

    const alreadyVote = await voteExists(questionId, userId);

    if (alreadyVote) {
        await alreadyVote.destroy();
    } else {
        await QuestionVote.create({
            upVote: vote,
            userId,
            questionId
        });
    }
    res.end();
}));



module.exports = router;
