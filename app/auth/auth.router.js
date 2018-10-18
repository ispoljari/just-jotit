'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const config = require('../config');
const router = express.Router();

const {
  localPassportMiddleware,
  jwtPassportMiddleware
} = require('./auth.strategy');

const createAuthToken = function(user) {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
}

router.post('/login', localPassportMiddleware, (req, res) => {
  const authToken = createAuthToken(req.user.serialize());
  return res.json({authToken});
});

router.post('/refresh', jwtPassportMiddleware, (req, res) => {
  const authToken = createAuthToken(req.user);
  return res.json({authToken});
})

module.exports = {router};