import mongoose from 'mongoose';

const booking = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    requestId: { type: String, required: true, unique: true },
    clinicId: { type: String, required: true },
    startAt: { type: String, required: true },
    endAt: { type: String, required: true },
    approved: { type: String },
});

export default mongoose.model("Booking", booking);