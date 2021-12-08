import mongoose from 'mongoose';

const booking = new mongoose.Schema({
    requestId: { type: String, required: true, unique: true },
    clinicId: { type: String, required: true },
    startAt: { type: String, required: true },
});

export default mongoose.model("Booking", booking);