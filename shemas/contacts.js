const Joi = require('joi');

const addContactShema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
});

const updateFavoriteShema = Joi.object({ favorite: Joi.bool() });

module.exports = { addContactShema, updateFavoriteShema };