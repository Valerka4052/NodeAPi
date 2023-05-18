const { Schema, model } = require('mongoose');
const { hahdleMongooseError } = require('../helpers');
const Joi = require('joi');



const userShema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
    avatarURL: String,
    token: String
}, { versionKey: false });

userShema.post("save", hahdleMongooseError);
const User = model("User", userShema);

const registerShema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

const emailShema = Joi.object({
    email: Joi.string().required().messages({ 'any.required': 'missing required field  {#label}' }),
});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required().messages({ 'any.required': 'missing field {#label}' })
});

module.exports = { registerShema, User, updateSubscriptionSchema, emailShema };
