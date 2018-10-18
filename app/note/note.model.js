'use strict';

// Import 3rd party frameworks
const mongoose = require('mongoose');
const joi = require('joi');

// Setup mongoose promises as native ES6 promises
mongoose.Promise = global.Promise;

// Define the schema constructor
const Schema = mongoose.Schema;

// Define the note schema
const noteSchema = Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  title: {type: String, required: true},
  content: {type: String, required: true},
  createDate: {type: Date},
  updateDate: {type: Date, default: Date.now}
});

noteSchema.methods.serialize = function() {
  let user;

  if (typeof this.user.serialize === function) {
    user = this.user.serialize();
  } else {
    user = this.user;
  }

  return {
    id: this._id,
    user : user,
    title: this.title,
    content: this.content,
    createDate: this.createDate,
    updateDate: this.updateDate
  }
}

const noteJoiSchema = joi.object().keys({
  user: joi.string().optional(),
  title: joi.string().min(1).required(),
  content: joi.string().min(1).required(),
  createDate: joi.date().timestamp()
});

const Note = mongoose.model('Note', noteSchema);

module.exports = {Note};