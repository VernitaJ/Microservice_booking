import BookingCommands from '../../command/booking.js';
import broker from '../broker.js';
import Booking from '../../model/booking.js';
import sendEmail from '../../util/sendEmail.js';
import constructDentistNotification from '../../util/constructDentistNotification.js';
import constructHTMLDentistNotification from '../../util/constructHTMLDentistNotification.js';
import ClinicEmail from '../../model/clinicEmail.js';
import { compareAsc, format } from 'date-fns';

let concurrentRequests = 0;

const handleBookingRequest = async (req) => {
    const request = JSON.parse(req);
    const { error } = BookingCommands.validate(request);
    if (error) {
        return console.log(error);
    }

    console.log(concurrentRequests++);
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
        sendEmailToDentist(request)
    } else {
        broker.publish(`dentistimo/booking/${request.requestId}/res`, "Booking request was rejected!");
    }
}

const sendEmailToDentist = (request) => {
    try{
        ClinicEmail.findOne({clinicId: request.clinicId}, (err, clinic) => {
          if(err){
            console.log(err)
          }
          else{
            if(clinic && clinic.email){
                const date = format(new Date(request.startAt), 'yyyy-MM-dd');
                const startAt = format(new Date(request.startAt), 'hh:mm');
                const endAt = format(new Date(request.endAt), 'hh:mm');
                const message = constructDentistNotification(request, {date, startAt, endAt});
                const messageHTML = constructHTMLDentistNotification(request, {date, startAt, endAt});
                sendEmail(clinic.email, clinic.email, "New appointment", message, messageHTML)
            }
          }
        })
      }catch(err){console.log(err)}
}

export default {
    handleBookingRequest,
    handleBookingResponse
}