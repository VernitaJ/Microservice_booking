import Joi from 'joi';
/*
    A data request consists of a/an:

    @id: an ID that uniquely identifies this request
    @requestType: the action the user would like to take towards the database
    @requestParam: the parameter passed in to perform this request action. Below is a list of request parameters.
        @id: ID that corresponds to the confirmation object ID
        @page: OPTIONAL. This is only used if you are querying for all confirmations, paginated.
        @pageSize: OPTIONAL. This is only used if you are querying for all confirmations, paginated.

    This function is used to validate this request body before passing it to the handler.
*/
const dataRequest = Joi.object({
    id: Joi.string()
        .required(),
    requestType: Joi.string()
        .alphanum()
        .required(),
    requestParams: Joi.object({
        id: Joi.string()
            .alphanum()
            .required(),
        page: Joi.number()
            .required()
            .optional(),
        pageSize: Joi.number()
            .required()
            .optional(),
    })
});

export default {
    dataRequest
}