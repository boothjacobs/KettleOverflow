const { User, Question, QuestionVote, AnswerVote } = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { Op } = require("sequelize");

const qUpvoteButton = document.getElementById("question-up-vote");
const qDownvoteButton = document.getElementById("question-down-vote");
const aUpvoteButton = document.getElementById("answer-up-vote");
const aDownvoteButton = document.getElementById("answer-down-vote");

const qUpVoteDiv = document.getElementById("question-upVoteTally");

if (!res.locals.authenticated) {
    qUpvoteButton.disabled = true;
    qDownvoteButton.disabled = true;
    aUpvoteButton.disabled = true;
    aDownvoteButton.disabled = true;
};

async function questionUpvotes(questionId) {
    const upVoteTally = await QuestionVote.count({
        where: {
            upVote: true
        }
    });
    return upVoteTally;
};

async function questionDownvotes(questionId) {
    const downVoteTally = await QuestionVote.count({
        where: {
            upVote: false
        }
    });
    return downVoteTally;
};

async function answerUpvotes(answerId) {
    const upVoteTally = await AnswerVote.count({
        where: {
            upVote: true
        }
    });
    return upVoteTally;
};

async function answerDownvotes(answerId) {
    const downVoteTally = await AnswerVote.count({
        where: {
            upVote: false
        }
    });
    return downVoteTally;
};

qUpvoteButton.addEventListener("click", async (e) => {
    const questionId = req.params.id;

    const voteExists = await QuestionVote.findOne({
        where: { userId },
        include: [Question, User]
    });

    if (voteExists) {

        const res = await fetch("/questions/:id/upVotes", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
              },
          body: JSON.stringify(voteExists),
        });
        await res.json();

    } else {

        const vote = true;
        try {
            const res = await fetch("/questions/:id/upVotes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify(vote),
            });

            if (!res.ok) {
            throw res;
            }
        } catch (err) {
            alert(err.message)
        };

    };

    let voteTally = questionUpvotes(questionId);
    qUpVoteDiv.innerHTML = voteTally;
});

qDownvoteButton.addEventListener("click", async (e) => {
    const questionId = req.params.id;


    const vote = false;
    try {
        const res = await fetch("/questions/:id/upVotes", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
            },
        body: JSON.stringify(vote),
        });

        if (!res.ok) {
          throw res;
        }
    } catch (err) {
        alert(err.message)
    }
});

aUpvoteButton.addEventListener("click", async (e) => {
    const answerId = req.params.id; //??????????

    const vote = true;
    try {
        const res = await fetch("/answers/:id/upVotes", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
            },
        body: JSON.stringify(vote),
        });

        if (!res.ok) {
          throw res;
        }
    } catch (err) {
        alert(err.message)
    }
});

aDownvoteButton.addEventListener("click", async (e) => {
    const answerId = req.params.id; //??????????

    const vote = false;
    try {
        const res = await fetch("/answers/:id/upVotes", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
            },
        body: JSON.stringify(vote),
        });

        if (!res.ok) {
          throw res;
        }
    } catch (err) {
        alert(err.message)
    }
});
