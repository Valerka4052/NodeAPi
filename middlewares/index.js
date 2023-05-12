const { validated} = require('./validateBody');
const isValid = require('./isValidId');
const authentificate = require('./authentificate')
module.exports = {authentificate, validated,  isValid,};