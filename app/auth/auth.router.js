'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const config = require('../config');
const router = express.Router();

const {localPassportMiddleware} = require('./auth.strategy');

router.post('/', localPassportMiddleware, (req, res) => {
  return res.send('Hello  there!');
});

module.exports = {router};