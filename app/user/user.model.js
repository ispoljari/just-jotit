'use strict';

// Import 3rd party frameworks
const mongoose = require('mongoose');
const joi = require('joi');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

// Initialize the Schema constructor;
const Schema = mongoose.Schema;

// Create the user schema
const userSchema = Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true}
});

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    username: this.username
  };
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

// Create a Joi schema for user data validation
const userJoiSchema = joi.object().keys({
  name: joi.string().min(1).trim().required(),
  email: joi.string().email().trim().required(),
  username: joi.string().alphanum().min(4).max(30).trim().required(),
  password: joi.string().min(8).max(72).trim().required()
});

const User = mongoose.model('User', userSchema);

module.exports = {User, userJoiSchema};