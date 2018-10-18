'use strict';

// Import 3rd party frameworks
const express = require('express');
const joi = require('joi');

// Import custom and env variables
const {HTTP_STATUS_CODES} = require('../config');
const {User, userJoiSchema} = require('./user.model');

// Mount the router middleware
const router = express.Router();

// Create A New User
router.post('/', (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  }

  //Validate the data sent by the user
  const validation = joi.validate(newUser, userJoiSchema);

  // If an error is found, end the request with a server error
  if  (validation.error) {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({error: validation.error});
  }

  User.findOne({
    $or: [
      {email: newUser.email},
      {username: newUser.username}
    ]
  })
  .then(user => {
    if (user) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({error: 'User with those credentials already exists'})
    }

    return User.hashPassword(newUser.password);
  })  
  .then(passwordHash => {
    newUser.password = passwordHash;
    
    User.create(newUser)
      .then(createdUser => {
        return res.status(HTTP_STATUS_CODES.CREATED).json(createdUser.serialize());
      })
      .catch(error => {
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
      });
  });
});

// Retrieve all users from the DB

router.get('/', (req, res) => {
  User.find()
    .then(users => {
      return res.status(HTTP_STATUS_CODES.OK).json(
        users.map(user => user.serialize())
      );
    })
    .catch(err => {
      return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(err);
    });
});

// Retrieve a single user

router.get('/:userid', (req, res) => {
  User.findById(req.params.userid)
  .then(user => {
    return res.status(HTTP_STATUS_CODES.OK).json(user.serialize());
  })
  .catch(err => {
    return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(err);
  });
});

module.exports = {router};
