import ConfirmationService from '../../service/confirmation.js';
import DataRequestCommands from '../../command/dataRequest.js';
import broker from '../broker.js';

/*
    A successful data request is passed to this handler. See dataRequest.js in the command folder for an example request body.
    A data request consists of a/an:

    @id: an ID that uniquely identifies this request
    @requestType: the action the user would like to take towards the database
    @requestParam: the parameter passed in to perform this request action - currently it is a request ID. This could be expanded on further.

    The @id is generated in the frontend as a UUID. See uuid.js for information on creating a unique ID.

    All data is sent back with this following MQTT topic: "frontend/booking/confirmation/res/${requestId}"
*/

const handleDataRequest = async (req) => {
    const request = JSON.parse(req);
    const { error } = DataRequestCommands.dataRequest.validate(request);
    if (error) {
        return console.log(error);
    }

    switch (request.requestType) {
        case "getConfirmation":
            getConfirmation(request.id, request.requestParams.id);
            break;
        case "getAllConfirmations":
            getAllConfirmations(request.id, request.requestParams.page, request.requestParams.pageSize);
            break;
        case "deleteConfirmation":
            deleteConfirmation(request.id, request.requestParams.id);
            break;
        default:
            console.log("Invalid request! You can get a confirmation, get all confirmations, or delete a confirmation.")
            break;
    }
}

const getConfirmation = async (requestId, requestParamId) => {
    const confirmation = await ConfirmationService.getConfirmation(requestParamId);
    if (!confirmation) {
        broker.publish(`frontend/booking/confirmation/res/${requestId}`, `Could not find this confirmation!`);
    } else {
        broker.publish(`frontend/booking/confirmation/res/${requestId}`, confirmation);
    }
}

const getAllConfirmations = async (requestId, page, pageSize) => {
    const confirmations = await ConfirmationService.getAllConfirmations(page, pageSize);
    if (!confirmations) {
        broker.publish(`frontend/booking/confirmation/res/${requestId}`, `could not find any confirmations!`);
    } else {
        broker.publish(`frontend/booking/confirmation/res/${requestId}`, confirmations);
    }
}

const deleteConfirmation = async (requestId, requestParamId) => {
    const confirmation = await ConfirmationService.deleteConfirmation(requestParamId); 
    if (!confirmation) {
        broker.publish(`frontend/booking/confirmation/res/${requestId}`, `Could not delete!`);
    } else {
        broker.publish(`frontend/booking/confirmation/res/${requestId}`, `Deleted confirmation ${requestParamId}`);
    }
}

export default {
    handleDataRequest
}