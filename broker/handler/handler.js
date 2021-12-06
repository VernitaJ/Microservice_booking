import BookingCommands from '../../command/booking.js';
import Confirmation from '../../model/confirmation.js';
import broker from '../broker.js'

const bookingRequest = async (req) => {
    const { error } = BookingCommands.validateBooking.validate(req);
    if (error) {
        return console.log(error);
    }
    broker.publish(broker.BOOKING_REQRES_TOPIC + "availability/req", req);
    await bookingResponse(req);
}

const bookingResponse = async (req) => {
    if (req.approved === "approve") {
        const confirmation = await Confirmation.create({
            userId: req.userId,
            requestId: req.requestId,
            dentistId: req.dentistId,
            date: req.date,
            time: req.time
        });
        broker.publish(broker.BOOKING_REQRES_TOPIC + `availability/${confirmation.requestId}/res`, confirmation);
    } else {
        broker.publish(broker.BOOKING_REQRES_TOPIC + `availability/${req.requestId}/res`, "Booking request was rejected!");
    }
}

export default {
    bookingRequest
}