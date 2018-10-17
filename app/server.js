'use strict';

// Import libraries, frameworks, variables

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const {DATABASE_URL, HTTP_STATUS_CODES, PORT} = require('./config');

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

// Start Server
function startServer(databaseUrl, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, {useNewUrlParser: true}, err => {
      if (err) {
        return reject(err);
      }
      console.info(`The database successfuly connected to ${databaseUrl}`);

      server = app.listen(port, () => {
        console.info(`The server started listening at port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      })
    })
  })
  .catch((err) => {
    console.error(err);
  })
}

function stopServer() {
  return mongoose.disconnect().then(() => {
    return new Promise ((resolve, reject) => {
      console.info('The server has disconnected from the DB.');

      server.close(err => {
        console.log(err);
        return reject(err);
      });

      console.info('The server has shut down.');
      resolve();
    })
    .then(err => {
      console.error(err);
    })
  });
}

if (require.main === module) {
  startServer(DATABASE_URL);
}

module.exports = {app, startServer, stopServer};