'use strict';

// Import libraries, frameworks

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

// Create an express app instance
const app = express();

// Declare a variable which will hold the server instance
let server;

// App Middleware
// -------------------------

// HTTP request logger
app.use(morgan('common'));

// Body parser
app.use(express.json());

// Send static files to client
app.use(express.static('./public'));

// --------------------------