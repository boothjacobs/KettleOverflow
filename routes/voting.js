const express = require('express');
const router = express.Router();
const { loginUser, logoutUser, restoreUser } = require('../auth')
const { User, Question, QuestionVote } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');
const { Op } = require("sequelize");

router.post("/questions/:id/upVotes", asyncHandler(async (req, res) => {

}));

router.post("/answers/:id/upVotes", asyncHandler(async (req, res) => {

}));

router.post("/questions/:id/upVotes", asyncHandler(async (req, res) => {

}));

router.post("/answers/:id/upVotes", asyncHandler(async (req, res) => {

}));
