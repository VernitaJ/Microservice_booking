import Joi from 'joi';

const validateBooking = Joi.object({
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
        .required(),
});

export default validateBooking;