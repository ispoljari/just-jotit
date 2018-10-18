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
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  title: {type: String, required: true},
  content: {type: String, required: true},
  createDate: {type: Date},
  updateDate: {type: Date, default: Date.now}
});

const Note = mongoose.model('Note', noteSchema);

module.exports = {Note};