const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { requireAuth } = require('../auth') //Need login/ logout
const { check, validationResult } = require('express-validator');
const { Question, User, Answer, AnswerVote, sequelize, Sequelize } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');
const { Op } = require("sequelize");

async function answerUpvotes(answerId) {
    const upVoteTally = await AnswerVote.count({
        where: {
            [Op.and]: [
                { answerId },
                { upVote: true },
            ]
        }
    });
    return upVoteTally;
};
async function answerDownvotes(answerId) {
    const downVoteTally = await AnswerVote.count({
        where: {
            [Op.and]: [
                { answerId },
                { upVote: false },
            ]
        }
    });
    return downVoteTally;
};
async function voteExists(answerId, userId) {
    await AnswerVote.findOne({
        where: {
            [Op.and]: [
                { answerId },
                { userId },
            ]
        }
    });
};

router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
    const answerId = req.params.id
    console.log(req.params.id)
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

router.post('/:id/votes', asyncHandler(async (req, res) => {
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
    res.end();
}));

module.exports = router;
