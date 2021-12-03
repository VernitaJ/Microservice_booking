import mongoose from 'mongoose';

const confirmation = new mongoose.Schema({
    userId: String,
    requestId: String,
    dentistId: String,
    time: String
});

export default mongoose.model("Confirmation", confirmation);