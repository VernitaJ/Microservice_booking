import BookingCommands from '../../command/booking.js';
import Confirmation from '../../model/confirmation.js';
import broker from '../broker.js';

const handleBookingRequest = async (req) => {
    const request = JSON.parse(req);
    console.log(request);
    const { error } = BookingCommands.validateBooking.validate(request);
    if (error) {
        return console.log(error);
    }
    broker.publish(`dentistimo/booking/availability/req`, request);
    
    broker.broker.on("message", (topic, message) => {
        if (topic === `dentistimo/booking/availability/${request.requestId}/res`) {
            handleBookingResponse(request, message.toString("utf-8"));
        }
    });
}

const handleBookingResponse = async (req, res) => {
    const request = JSON.parse(req);
    const response = JSON.parse(res);
    if (response.response === "approve") {
        const confirmation = await Confirmation.create({
            requestId: request.requestId,
            clinicId: request.clinicId,
            startAt: request.startAt,
            endAt: request.endAt
        });
        broker.publish(`dentistimo/booking/${confirmation.requestId}/res`, confirmation);
    } else {
        broker.publish(`dentistimo/booking/${request.requestId}/res`, "Booking request was rejected!");
    }
}

export default {
    handleBookingRequest,
    handleBookingResponse
}