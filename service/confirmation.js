import Confirmation from '../model/confirmation.js';
import ConfirmationCommands from '../command/confirmation.js'

async function createConfirmation(payload) {
    const { error } = ConfirmationCommands.createConfirmation(payload);
    if (error) {
        return console.log("Invalid payload body!");
    }
    return await Confirmation.create({
        userId: payload.userId,
        requestId: payload.requestId,
        dentistId: payload.dentistId,
        date: payload.date,
        time: payload.time,
    });
}

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
    createConfirmation,
    getConfirmation,
    deleteConfirmation
}
