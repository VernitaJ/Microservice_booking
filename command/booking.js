import Joi from 'joi';

const createBooking = Joi.object({
    userId: Joi.string()
        .alphanum()
        .required(),
    requestId: Joi.string()
        .alphanum()
        .required(),
    dentistId: Joi.string()
        .alphanum()
        .required(),
    issuance: Joi.string()
        .alphanum()
        .required(),
    date: Joi.string()
        .alphanum()
        .required()
});

const updateBooking = Joi.object({
    userId: Joi.string()
        .alphanum()
        .required(),
    requestId: Joi.string()
        .alphanum()
        .required(),
    dentistId: Joi.string()
        .alphanum()
        .required(),
    issuance: Joi.string()
        .alphanum()
        .required(),
    date: Joi.string()
        .alphanum()
        .required()
});

export default {
    createBooking,
    updateBooking
}
