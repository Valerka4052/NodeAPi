const { HttpError } = require('../helpers/');

const validated = (shema) => {
    const func = (req, res, next) => {
        const { name, email, phone } = req.body;
        if (!name && !email && !phone) next(HttpError(400, "missing fields"));
        if (!name) next(HttpError(400, "missing required name field"));
        if (!email) next(HttpError(400, "missing required email field"));
        if (!phone) next(HttpError(400, "missing required phone field"));
        const { error } = shema.validate(req.body);
        if (error) next(HttpError(400, error.message));
        next();
    };
    return func;
};

module.exports = validated;

