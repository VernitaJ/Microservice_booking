import Confirmation from '../model/confirmation.js';
import ConfirmationCommands from '../command/confirmation.js'

async function getConfirmation(id) {
    if (!id) {
        return Promise.reject("Undefined confirmation ID!");
    }
    const confirmation = await Confirmation.find({ requestId: id })  

    if (!confirmation) {
        return Promise.reject("Confirmation could not be found!");
    }
    return confirmation;
}

async function getAllConfirmations() {
    return await Confirmation.find({});
}

async function deleteConfirmation(id) {
    if (!id) {
        return Promise.reject("Undefined confirmation ID!");
    }
    const confirmation = getConfirmation(id);

    if (!confirmation) {
        return Promise.reject("Confirmation could not be found!");
    }
    return await Confirmation.delete({ requestId: id });
}

export default {
    getConfirmation,
    getAllConfirmations,
    deleteConfirmation
}
