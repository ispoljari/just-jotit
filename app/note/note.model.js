'use strict';

// Import 3rd party frameworks
const mongoose = require('mongoose');
const joi = require('joi');

// Setup mongoose promises as native ES6 promises
mongoose.Promise = global.Promise;

// Define the schema constructor
const Schema = mongoose.Schema;

