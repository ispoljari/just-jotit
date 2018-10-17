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