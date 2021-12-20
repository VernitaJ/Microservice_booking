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
        .optional(),
    patientEmail: Joi.string()
        .optional(),
    patientPhone: Joi.string()
        .optional(),
    message: Joi.string()
        .optional(),
});

export default validateBooking;