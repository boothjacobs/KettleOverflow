const express = require('express');
const router = express.Router();
const { loginUser, logoutUser, restoreUser } = require('../auth')
const { User, Question, QuestionVote, AnswerVote } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');
const { Op } = require("sequelize");

async function questionUpvotes(questionId) {
    const tally = await QuestionVote.count({
        where: {
            upVote: true
        }
    })
};

async function questionDownvotes(questionId) {

};

async function answerUpvotes(answerId) {

};

async function answerDownvotes(answerId) {

};



router.post("/questions/:id/upVotes", asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const questionId = req.params.id;
    const { vote } = req.body;

    const voteExists = await QuestionVote.findOne({
            where: { userId },
            include: [Question, User]
    });

    if (voteExists) {
        await voteExists.destroy();
    } else {
        await QuestionVote.create({
            upVote: vote,
            userId,
            questionId
        });
    }

}));

router.post("/answers/:id/upVotes", asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const answerId = req.params.id;
    const { vote } = req.body;
    await AnswerVote.create({
        upVote: vote,
        userId,
        answerId
    });
}));

router.delete("/questions/:id/upVotes", asyncHandler(async (req, res) => {

}));

router.delete("/answers/:id/upVotes", asyncHandler(async (req, res) => {

}));
