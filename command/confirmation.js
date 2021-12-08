import Joi from 'joi';

const createConfirmation = Joi.object({
    userId: Joi.string()
        .alphanum()
        .required(),
    requestId: Joi.string()
        .alphanum()
        .required(),
    clinicId: Joi.string()
        .alphanum()
        .required(),
    startAt: Joi.string()
        .alphanum()
        .required(),
    endAt: Joi.string()
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
    clinicId: Joi.string()
        .alphanum()
        .required(),
    startAt: Joi.string()
        .alphanum()
        .required(),
    endAt: Joi.string()
        .alphanum()
        .required()
});

export default {
    createConfirmation,
    updateConfirmation
}