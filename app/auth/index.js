'use strict';

const {
  localStrategy,
  jwtStrategy,
  localPassportMiddleware,
  jwtPassportMiddleware
} = require('./auth.strategy');

const {router} = require('./auth.router');

module.exports = {
  localStrategy,
  jwtStrategy,
  localPassportMiddleware,
  jwtPassportMiddleware,
  router
};