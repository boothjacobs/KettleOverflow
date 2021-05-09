const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { requireAuth } = require('../auth') //Need login/ logout
const { check, validationResult } = require('express-validator');
const { Question, User, Answer, AnswerVote, sequelize, Sequelize } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');
const { Op } = require("sequelize");

async function voteExists(answerId, userId) {
    const ifVote = await AnswerVote.findOne({
        where: {
            [Op.and]: [
                { answerId },
                { userId },
            ]
        }
    });
    return ifVote;
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

router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
    const answerId = req.params.id

    const answer = await Answer.findByPk(answerId)

    answer.content = req.body.content
    await answer.save()
    res.sendStatus(201)
}))

router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
    const answer = await Answer.findOne({
        where: {
            id: req.params.id
        }
    });

    await answer.destroy()
    res.redirect('/')

}));

router.post('/:id/votes', requireAuth, asyncHandler(async (req, res) => {
    const answerId = req.params.id;
    const { userId } = req.session.auth;
    const { vote } = req.body;

    const alreadyVote = await voteExists(answerId, userId);
    if (alreadyVote) {
        await alreadyVote.destroy();
    } else {
        await AnswerVote.create({
            upVote: vote,
            userId,
            answerId
        });
    }

    let upvotesA = await answerUpvotes(answerId);
    let downvotesA = await answerDownvotes(answerId);

    res.setHeader('Content-Type', 'application/json');
    res.send({upvotes: upvotesA, downvotes: downvotesA});
}));

module.exports = router;
