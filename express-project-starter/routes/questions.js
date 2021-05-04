const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { requireAuth } = require('../auth') //Need login/ logout
const { check, validationResult } = require('express-validator');
const { User } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');
