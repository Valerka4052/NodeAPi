const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');

const isValid = (req, res, next) => {
    if (isValidObjectId(req.params.id)) next();
    next(HttpError(400, `${req.params.id} is not valid id`));
};
module.exports = isValid