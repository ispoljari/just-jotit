'use strict';

// Import 3rd frameworks and libraries
const express = require('express');
const joi = require('joi');

// Initialize the router module constructor
const router = express.Router();

// Import custom and env variables
const {HTTP_STATUS_CODES} = require('../config');

// Import the note model and joi schema
const {Note, noteJoiSchema} = require('./note.model');

// Import the jwt authentication middleware
const {jwtPassportMiddleware} = require('../auth');

const {User} = require('../user');

// Create a new note
router.post('/', jwtPassportMiddleware, (req, res) => {
  const newNote = {
    user: req.user.id,
    title: req.body.title,
    content: req.body.content,
    createDate: Date.now()
  };

  const validation = joi.validate(newNote, noteJoiSchema);

  if (validation.error) {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({error: validation.error});
  } 

  Note.create(newNote)
    .then(note => {
      return res.status(HTTP_STATUS_CODES.CREATED).json(note.serialize());
    })
    .catch(err => {
      return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(err);
    });
});

// Retrieve a note by id
router.get('/:noteid', jwtPassportMiddleware, (req, res) => {
  Note.findById(req.params.noteid)
    .populate('user')
    .then(note => {
      return res.status(HTTP_STATUS_CODES.OK).json(note.serialize());
    })
    .catch(err => {
      return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(err);
    });
});

module.exports = {router};