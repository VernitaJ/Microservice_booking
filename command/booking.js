import Joi from 'joi';

const validateBooking = Joi.object({
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
        .required(),
    time: Joi.string()
        .regex(/^([0-9]{2})\:([0-9]{2})$/)
        .required(),
    approved: Joi.string()
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
        .required(),
    time: Joi.string()
        .regex(/^([0-9]{2})\:([0-9]{2})$/)
        .required(),
    approved: Joi.string()
});

export default {
    validateBooking,
    updateBooking
}
