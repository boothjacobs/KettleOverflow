const express = require('express');
const router = express.Router();
const { loginUser, logoutUser, restoreUser } = require('../auth')
const { User, Question, QuestionVote, AnswerVote } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');
const { Op } = require("sequelize");



const { userId } = req.session.auth;

router.post("/questions/:id/upVotes", asyncHandler(async (req, res) => {
    const questionId = req.params.id;
    const { vote } = req.body;

    await QuestionVote.create({
        upVote: vote,
        userId,
        questionId
    });

}));

router.post("/answers/:id/upVotes", asyncHandler(async (req, res) => {
    const answerId = req.params.id;
    const { vote } = req.body;

    // const voteExists = await AnswerVote.findOne({
    //     where: { userId },
    //     include: [Answer, User]
    // });

    await AnswerVote.create({
        upVote: vote,
        userId,
        answerId
    });
}));

router.delete("/questions/:id/upVotes", asyncHandler(async (req, res) => {
    const questionId = req.params.id;
    const { voteExists } = req.body;
    await voteExists.destroy();
}));

router.delete("/answers/:id/upVotes", asyncHandler(async (req, res) => {

}));
