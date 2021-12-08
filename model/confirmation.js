import mongoose from 'mongoose';

const confirmation = new mongoose.Schema({
    requestId: { type: String, required: true, unique: true },
    clinicId: { type: String, required: true },
    startAt: { type: String, required: true },
    endAt: { type: String, required: true }
});

export default mongoose.model("Confirmation", confirmation);