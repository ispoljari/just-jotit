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

const User = mongoose.model('User', userSchema);
