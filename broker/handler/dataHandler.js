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
*/

const handleDataRequest = async (request) => {
    const { error } = DataRequestCommands.dataRequest.validate(request);
    if (error) {
        return console.log(error);
    }

    switch (request.requestParam) {
        case "getConfirmation":
            getConfirmation(request.id, request.requestParam);
            break;
        case "getAllConfirmations":
            getAllConfirmations();
            break;
        case "deleteConfirmation":
            deleteConfirmation(request.id, request.requestParam);
            break;
        default:
            console.log("Invalid request! You can get a confirmation, get all confirmations, or delete a confirmation.")
            break;
    }
}

const getConfirmation = async (requestId, requestParam) => {
    const confirmation = await ConfirmationService.getConfirmation(requestParam);

    if (!confirmation) {
        broker.publish(`frontend/booking/res/confirmation/${requestId}`, `Could not find this confirmation!`);
    } else {
        broker.publish(`frontend/booking/res/confirmation/${requestId}`, confirmation);
    }
}

const getAllConfirmations = async (page, pageSize) => {
    const confirmations = await ConfirmationService.getAllConfirmations(page, pageSize);
    if (!confirmations) {
        broker.publish(`frontend/booking/res/confirmation`, `could not find any confirmations!`);
    } else {
        broker.publish(`frontend/booking/res/confirmation`, confirmations);
    }
}

const deleteConfirmation = async (id) => {
    const confirmation = await ConfirmationService.deleteConfirmation(id); 
    if (!confirmation) {
        broker.publish(`frontend/booking/res`, `Could not delete!`);
    } else {
        broker.publish(`frontend/booking/res`, `Deleted confirmation ${id}`);
    }
}

export default {
    handleDataRequest
}