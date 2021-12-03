import mongoose from 'mongoose';

const booking = new mongoose.Schema({
    userId: String,
    requestId: String,
    dentistId: String,
    issuance: String,
    date: String,
});

export default mongoose.model("Booking", booking);