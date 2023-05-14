const { validated} = require('./validateBody');
const isValid = require('./isValidId');
const authentificate = require('./authentificate')
const upload = require('./upload')
module.exports = { authentificate, validated, isValid, upload };