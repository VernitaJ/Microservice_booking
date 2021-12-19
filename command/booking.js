import Joi from 'joi';

const validateBooking = Joi.object({
    requestId: Joi.string()
        .required(),
    clinicId: Joi.number()
        .required(),
    startAt: Joi.string()
        .regex(/^([0-9]{2})\:([0-9]{2})$/)
        .required(),
    endAt: Joi.string()
        .regex(/^([0-9]{2})\:([0-9]{2})$/)
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