import Joi from 'joi';

const validateBooking = Joi.object({
    requestId: Joi.string()
        .required(),
    clinicId: Joi.number()
        .required(),
    startAt: Joi.string()
        .required(),
    endAt: Joi.string()
        .required(),
    patientName: Joi.string()
        .required(),
    patientEmail: Joi.string()
        .required(),
    patientPhone: Joi.string()
        .required(),
    message: Joi.string()
        .optional(),
});

export default validateBooking;