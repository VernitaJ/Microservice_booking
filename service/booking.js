import Booking from '../model/booking.js';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;

async function getBooking(id) {
    if (!id) {
        return Promise.reject("Undefined confirmation ID!");
    }
    const confirmation = await Booking.find({ requestId: id })  

    if (!confirmation) {
        return Promise.reject("Confirmation could not be found!");
    }
    return confirmation;
}

async function getAllBookings(page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE) {
    if (isNaN(page)) {
        return Promise.reject(`Page must be a number (value = ${page})`);
    }

    if (isNaN(pageSize)) {
        return Promise.reject(`Page size must be a number (value = ${pageSize})`);
    }

    if (page < 1) {
        return Promise.reject(`Page can't be lower than 1 (value = ${page})`);
    }

    if (pageSize < 0) {
        return Promise.reject(`Page size can't be lower than 0 (value = ${pageSize})`);
    }

    return Booking.find()
        .limit(pageSize)
        .skip(page - 1)
        .exec();
}

async function deleteBooking(id) {
    if (!id) {
        return Promise.reject("Undefined confirmation ID!");
    }
    const confirmation = getConfirmation(id);

    if (!confirmation) {
        return Promise.reject("Confirmation could not be found!");
    }
    return await Booking.delete({ requestId: id });
}

export default {
    getBooking,
    getAllBookings,
    deleteBooking
}
