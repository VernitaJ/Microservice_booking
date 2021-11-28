import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: Number,
    requestId: Number,
    dentistId: Number,
    issuance: Number,
    date: Date
});

export default bookingSchema;

