import Joi from 'joi';

const createConfirmation = Joi.object({
    userId: Joi.string()
        .alphanum()
        .required(),
    requestId: Joi.string()
        .alphanum()
        .required(),
    dentistId: Joi.string()
        .alphanum()
        .required(),
    date: Joi.date()
        .required(),
    time: Joi.string()
        .alphanum()
        .required()
});

const updateConfirmation = Joi.object({
    userId: Joi.string()
        .alphanum()
        .required(),
    requestId: Joi.string()
        .alphanum()
        .required(),
    dentistId: Joi.string()
        .alphanum()
        .required(),
    date: Joi.date()
        .required(),
    time: Joi.string()
        .alphanum()
        .required()
});

export default {
    createConfirmation,
    updateConfirmation
}