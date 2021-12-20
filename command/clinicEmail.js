import Joi from 'joi';

const validateClinicEmail = Joi.object({
    id: Joi.string()
        .required(),
    email: Joi.string()
        .email()
        .required(),
});

export default validateClinicEmail;