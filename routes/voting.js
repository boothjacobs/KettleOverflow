const express = require('express');
const router = express.Router();
const { loginUser, logoutUser, restoreUser } = require('../auth')
const { User, Question, QuestionVote, AnswerVote } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');
const { Op } = require("sequelize");


async function voteExists(questionId, userId) {
    await QuestionVote.findOne({
        where: {
            [Op.and]: [
                { questionId },
                { userId },
            ]
        },
        include: [Question, User]
    });
};

// router.post("/questions/:id/upvotes", asyncHandler(async (req, res) => {
//     const questionId = req.params.id;
//     const { userId } = req.session.auth;
//     const { vote } = req.body;

//     console.log("reached route")

//     const alreadyVote = voteExists(questionId, userId);

//     if (alreadyVote) {
//         await alreadyVote.destroy();
//     } else {
//         await QuestionVote.create({
//             upVote: vote,
//             userId,
//             questionId
//         });
//     }

//     let voteTally = questionUpvotes(questionId);
//     qUpVoteDiv.innerHTML = voteTally;

// }));

router.post("/answers/:id/upvotes", asyncHandler(async (req, res) => {
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

// router.delete("/questions/:id/upVotes", asyncHandler(async (req, res) => {

// }));

// router.delete("/answers/:id/upVotes", asyncHandler(async (req, res) => {

// }));
