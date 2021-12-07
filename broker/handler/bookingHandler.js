import BookingCommands from '../../command/booking.js';
import Confirmation from '../../model/confirmation.js';
import broker from '../broker.js'

const handleBookingRequest = (req) => {
    const request = JSON.parse(req);
    console.log(request);
    const { error } = BookingCommands.validateBooking.validate(request);
    if (error) {
        return console.log(error);
    }
    broker.publish("dentistimo/booking/availability/req", request);
}

const handleBookingResponse = async (req) => {
    if (req.approved === "approve") {
        const confirmation = await Confirmation.create({
            userId: req.userId,
            requestId: req.requestId,
            dentistId: req.dentistId,
            date: req.date,
            time: req.time
        });
        console.log("Request approved!");
        broker.publish(`dentistimo/booking/${confirmation.requestId}/res`, confirmation);
    } else {
        console.log("Request rejected!")
        broker.publish(`dentistimo/booking/${req.requestId}/res`, "Booking request was rejected!");
    }
}

export default {
    handleBookingRequest,
    handleBookingResponse
}