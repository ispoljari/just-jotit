const {router} = require('./note.router');

const {Note, noteJoiSchema} = require('./note.model');

module.exports = {router, Note, noteJoiSchema};