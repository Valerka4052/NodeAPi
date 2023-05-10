const { HttpError } = require('../helpers/');

const errMessage = fieldName => `missing required ${fieldName} field`;

const validated = (shema) => {
    const func = (req, res, next) => {
        const { name, email, phone, favorite } = req.body;
        if (!name && !email && !phone) next(HttpError(400, "missing fields"));
        if (!name) next(HttpError(400, errMessage('name')));
        if (!email) next(HttpError(400, errMessage('email')));
        if (!phone) next(HttpError(400, errMessage('phone')));
        const { error } = shema.validate(req.body);
        if (error) next(HttpError(400, error.message));
        next();
    };
    return func;
};

const validteStatus = (shema) => {
    const func = (req, res, next) => {
        console.log(req.body);
        const {favorite} = req.body
        if (!favorite) next(HttpError(400, "missing field favorite"));
        const { error } = shema.validate(req.body);
        if (error) next(HttpError(400, error.message));
        next();
    };
    return func;
};

module.exports = {validated, validteStatus};

