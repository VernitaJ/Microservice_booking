import mongoose from 'mongoose';

const confirmation = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    requestId: { type: String, required: true, unique: true },
    dentistId: String,
    date: String,
    time: String
});

export default mongoose.model("Confirmation", confirmation);