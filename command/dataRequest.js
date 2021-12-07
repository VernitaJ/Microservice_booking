import Joi from 'joi';
/*
    A data request consists of a/an:

    @id: an ID that uniquely identifies this request
    @requestType: the action the user would like to take towards the database
    @requestParam: the parameter passed in to perform this request action - currently it is a request ID. This could be expanded on further.

    This function is used to validate this request body before passing it to the handler.
*/
const dataRequest = Joi.object({
    id: Joi.string()
        .uuid()
        .required(),
    requestType: Joi.string()
        .alphanum()
        .required(),
    requestParam: Joi.string()
        .alphanum()
        .required()
});

export default {
    dataRequest
}