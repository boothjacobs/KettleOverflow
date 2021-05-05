const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { loginUser, logoutUser } = require('../auth')
const { check, validationResult } = require('express-validator');
const { User, Question, QuestionVote } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');
