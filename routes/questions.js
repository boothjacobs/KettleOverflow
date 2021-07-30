const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { requireAuth } = require('../auth') //Need login/ logout
const { check, validationResult } = require('express-validator');
const { Question, User, Answer, QuestionVote, AnswerVote, sequelize, Sequelize } = require('../db/models')
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
            [Op.and]: [ { questionId }, { upVote: false } ]
        }
    });
    return downVoteTally;
};
async function answerUpvotes(answerId) {
    const answerUpvotes = await AnswerVote.findAll({
        where: {
            [Op.and]: [ { answerId }, { upVote: true } ]
        }
    });
    return answerUpvotes;
};
async function answerDownvotes(answerId) {
    const answerDownvotes = await AnswerVote.findAll({
        where: {
            [Op.and]: [ { answerId }, { upVote: false } ]
        }
    });
    return answerDownvotes;
};
async function voteExists(questionId, userId) {
    const answer = await QuestionVote.findOne({
        where: {
            [Op.and]: [ { questionId }, { userId } ]
        }
    });
    return answer;
};

router.get('/', csrfProtection, asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth
    const questions = await Question.findAll({
        include: [User],
        order: [['createdAt', 'DESC']],
        limit: 10,
    });
    const number = Math.ceil(Math.random() * 5).toString()
    res.render('home', {
        csrfToken: req.csrfToken(),
        questions,
        title: 'Questions page',
        number,
        userId
    })
}));

router.post('/', asyncHandler(async (req, res, next) => {
    const { content } = req.body;
    const questions = await Question.findAll({
        include: [User],
        where: {
            content: {
                [Op.iLike]: `%${content}%`,
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
        const question = await Question.create({
            content,
            userId
        })
        res.redirect(`/questions/${question.id}`)
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

    const answers = await Answer.findAll({
        where: { questionId: req.params.id }
    });

    let answerVotes = {};
    if (answers) {
        const ids = answers.map((ele) => ele.dataValues.id);
        for (let i = 0; i < ids.length; i++) {
            let upvotesA = await answerUpvotes(ids[i]);
            let downvotesA = await answerDownvotes(ids[i]);
            answerVotes[`${ids[i]}`] = upvotesA;
            answerVotes[`${ids[i]}`] = downvotesA;
        }
    }

    let title;
    if (!question) {
        title = 'Nothing To See Here'
    } else {
        title = question.content
    }
    res.render('question', {
        question,
        title,
        upvotes,
        downvotes,
        answerVotes,
        // answerKeys
    });
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

    const upvotes = await questionUpvotes(req.params.id);
    const downvotes = await questionDownvotes(req.params.id);

    const answers = await Answer.findAll({
        where: { questionId: req.params.id }
    });
    let upvotesA;
    let downvotesA;
    if (answers) {
        const ids = answers.map((ele) => ele.dataValues.id);
        for (let i = 0; i < ids.length; i++) {
            upvotesA = await answerUpvotes(ids[i]);
            downvotesA = await answerDownvotes(ids[i]);
        }
    }

    res.setHeader('Content-Type', 'application/json');
    res.send({upvotes: upvotes, downvotes: downvotes, ansUpvotes: upvotesA, ansDownvotes: downvotesA});

}));



module.exports = router;
