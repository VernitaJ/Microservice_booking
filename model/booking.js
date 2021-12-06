import mongoose from 'mongoose';

const booking = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    requestId: { type: String, required: true, unique: true },
    dentistId: String,
    issuance: String,
    date: String,
    time: String,
    approved: String
});

export default mongoose.model("Booking", booking);