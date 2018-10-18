'use strict';

const {
  localStrategy,
  jwtStrategy,
  localPassportMiddleware,
  jwtPassportMiddleware
} = require('./auth.strategy');

module.exports = {
  localStrategy,
  jwtStrategy,
  localPassportMiddleware,
  jwtPassportMiddleware
};