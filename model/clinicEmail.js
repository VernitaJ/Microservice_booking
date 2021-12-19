import mongoose from 'mongoose';

const clinicEmail = new mongoose.Schema({
    clinicId: { type: String, required: true, unique: true },
    email: { type: String }
});

export default mongoose.model("ClinicEmail", clinicEmail);