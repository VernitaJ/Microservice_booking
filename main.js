import dotenv from 'dotenv'
import { urlencoded, json } from 'express';
import express from 'express';
import cors from 'cors';
import broker from './broker/settings'

// Variables
const app = express();
const PORT = process.env.NODE_DOCKER_PORT || 3001;
const BOOKING_REQUEST_TOPIC = "booking/request/dentist";
const BOOKING_RESPONSE_TOPIC = "booking/response/dentist";

dotenv.config();
app.use(urlencoded({ extended: true }));
app.use(json());
app.options('*', cors());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.error(`Failed to connect to MongoDB with URI: ${MONGO_URI}`);
    console.error(err.stack);
    process.exit(1);
});

// Default GET route 
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Dentistimo Booking microservice!"
    });
});

// Broker subscriptions
broker.subscribe(BOOKING_REQUEST_TOPIC);
broker.subscribe(BOOKING_RESPONSE_TOPIC);

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Express server listening on port " + PORT);
});

export default app;