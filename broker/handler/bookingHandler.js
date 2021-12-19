import BookingCommands from '../../command/booking.js';
import broker from '../broker.js';
import Booking from '../../model/booking.js';

const handleBookingRequest = async (req) => {
    const request = JSON.parse(req);
    console.log(request);
    const { error } = BookingCommands.validate(request);
    if (error) {
        return console.log(error);
    }
    broker.publish(`dentistimo/booking/availability/req`, request);
    
    broker.broker.on("message", (topic, message) => {
        if (topic === `dentistimo/booking/availability/${request.requestId}/res`) {
            handleBookingResponse(JSON.stringify(request), message.toString("utf-8"));
        }
    });
}

const handleBookingResponse = async (req, res) => {
    const request = JSON.parse(req);
    const response = JSON.parse(res);
    console.log(request);
    console.log(response);
    if (response.response === "approve") {
        const confirmation = await Booking.create({
            requestId: request.requestId,
            clinicId: request.clinicId,
            startAt: request.startAt,
            endAt: request.endAt,
            patientName: request.patientName,
            patientEmail: request.patientEmail,
            patientPhone: request.patientPhone,
            message: request.message
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