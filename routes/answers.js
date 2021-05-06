const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { requireAuth } = require('../auth') //Need login/ logout
const { check, validationResult } = require('express-validator');
const { Question, User, Answer, sequelize, Sequelize } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');
const { Op } = require("sequelize");


router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
const answer = await Answer.findByPk(req.params.id,
        { include: [Question, User] })  

    res.render('question', {
        answer,
    })
}))

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

}))

module.exports = router;