const { Schema, model } = require('mongoose');
const { hahdleMongooseError } = require('../helpers');
const Joi = require('joi');

const addContactShema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
});

const updateFavoriteShema = Joi.object({ favorite: Joi.bool() });

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, {
    versionKey: false,
    // timestamps: true,
});

contactSchema.post("save", hahdleMongooseError);
const schemas = { addContactShema, updateFavoriteShema };;
const Contact = model('Contact', contactSchema);
module.exports = { Contact, schemas };