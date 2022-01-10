import mongoose from 'mongoose';

const booking = new mongoose.Schema({
    requestId: { type: String, required: true, unique: true },
    clinicId: { type: String, required: true },
    startAt: { type: String, required: true },
    endAt: { type: String, required: true },
    patientName: { type: String, required: true },
    patientEmail: { type: String, required: true},
    patientPhone: { type: String, required: true },
    message: { type: String },
});

export default mongoose.model("Booking", booking);