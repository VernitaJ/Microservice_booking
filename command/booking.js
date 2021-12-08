import Joi from 'joi';

const validateBooking = Joi.object({
    userId: Joi.string()
        .alphanum()
        .required(),
    requestId: Joi.string()
        .alphanum()
        .required(),
    clinicId: Joi.string()
        .alphanum()
        .required(),
    issuance: Joi.string()
        .alphanum()
        .required(),
    startAt: Joi.string()
        .alphanum()
        .required(),
    endAt: Joi.string()
        .alphanum()
        .required(),
    approved: Joi.string()
        .alphanum()
        .optional()
});

const updateBooking = Joi.object({
    userId: Joi.string()
        .alphanum()
        .required(),
    requestId: Joi.string()
        .alphanum()
        .required(),
    clinicId: Joi.string()
        .alphanum()
        .required(),
    issuance: Joi.string()
        .alphanum()
        .required(),
    startAt: Joi.string()
        .alphanum()
        .required(),
    endAt: Joi.string()
        .alphanum()
        .required(),
    approved: Joi.string()
        .alphanum()
        .optional()
});

export default {
    validateBooking,
    updateBooking
}
