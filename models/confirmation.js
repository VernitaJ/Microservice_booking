import mongoose from 'mongoose'

const confirmationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: Number,
    requestId: Number,
    time: String
});

export default confirmationSchema;