const {router} = require('./user.router');
const {User, userJoiSchema} = require('./user.model');

module.exports = {router, User, userJoiSchema};