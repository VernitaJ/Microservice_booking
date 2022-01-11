import mqtt from 'mqtt';
import dotenv from 'dotenv';
import BookingHandler from './handler/bookingHandler.js';
import DataHandler from './handler/dataHandler.js';
import ClinicEmailHandler from './handler/clinicEmailHandler.js';
import CircuitBreaker from 'opossum';
import { RateLimiter } from 'limiter';

const MQTT_BROKER_URI = `mqtt://host.docker.internal:${process.env.BROKER_PORT}`;
const MQTT_LOCALHOST_URI = `mqtt://localhost:1883`

const BOOKING_FRONTEND_TOPIC = "frontend/booking/#"; 
const BOOKING_REQRES_TOPIC = "dentistimo/booking/#";
const CLINIC_EMAIL_IMPORT_TOPIC = "dentist/email";


dotenv.config();

const MQTT_SETTINGS = {
    clean: true,
    connectTimeout: 4000,
    username: process.env.BROKER_USERNAME,
    password: process.env.BROKER_PASSWORD
}

// Variables to create CircuitBreaker
const CIRCUIT_BREAKER_SETTINGS = {
    timeout: 5000,
    errorThresholdPercentage: 50,
    resetTimeout: 30000
}

// Variables to create Rate Limiter
const rateLimiter = new RateLimiter({
    tokensPerInterval: 60,
    interval: "minute",
    fireImmediately: true,
});

// Initialise circuit breaker beforehand
const bookingRequestBreaker = new CircuitBreaker(BookingHandler.handleBookingRequest, CIRCUIT_BREAKER_SETTINGS);
const dataRequestBreaker = new CircuitBreaker(DataHandler.handleDataRequest, CIRCUIT_BREAKER_SETTINGS);
const clinicEmailImportBreaker = new CircuitBreaker(ClinicEmailHandler.handleImport, CIRCUIT_BREAKER_SETTINGS);

const broker = mqtt.connect(MQTT_BROKER_URI, MQTT_SETTINGS);

broker.on("connect", () => {
    console.log("Connected! Hello there, " + process.env.BROKER_USERNAME || "undefined user!");
    
    subscribe(BOOKING_REQRES_TOPIC);
    subscribe(BOOKING_FRONTEND_TOPIC);

    // For testing purposes! 

    // for (let i = 0; i < 61; i++) {
    //     publish(`dentistimo/booking/req`, {
    //         requestId: 'fdd00011-be48-40fa-b31a-e246e6ca4503',
    //         clinicId: '2',
    //         startAt: '2022-01-20T08:00:00.000Z',
    //         endAt: '2022-01-20T08:30:00.000Z',
    //         patientName: 'ayylmao',
    //         patientEmail: 'ayylmao@gmail.com',
    //         patientPhone: '0705204888'
    //     });
    // }
});

broker.on("message", async (topic, message) => {
    if (topic === "dentistimo/booking/req") {
        const remainingTokens = await rateLimiter.removeTokens(1);
        bookingRequestBreaker.fallback(() => console.log("Could not accept request at this time!"))
        if (remainingTokens > 0) {
            bookingRequestBreaker.fire(message.toString("utf-8"))
        } else {
            console.log("Service is overloaded! Try again later.")
        }
    }

    if (topic === `frontend/booking/confirmation/req`) {
        const remainingTokens = await rateLimiter.removeTokens(1);
        dataRequestBreaker.fallback(() => console.log("Could not accept request at this time!"));
        if (remainingTokens > 0) {
            dataRequestBreaker.fire(message.toString("utf-8"))
        } else {
            console.log("Service is overloaded! Try again later.")
        }
    }

    if (topic === CLINIC_EMAIL_IMPORT_TOPIC) {
        clinicEmailImportBreaker.fallback(() => console.log("Could not accept request at this time!"))
        clinicEmailImportBreaker.fire(message.toString("utf-8"))
            .then(console.log("Import request accepted!"))
            .catch(console.error);
    }

    if (topic === BOOKING_FRONTEND_TOPIC) {
        console.log(message.toString("utf-8"));
    }
});

broker.on("close", () => {
    console.log("MQTT client has been disconnected");
});

broker.on("error", (err) => {
    console.error(err.stack);
    broker.end();
});

// Publishes to MQTT
const publish = (topic, message) => {
    const options = {
        qos: 2,
        retain: false, 
    }
    broker.publish(topic, JSON.stringify(message), options);
}

// Subscribes to MQTT
const subscribe = (topic) => {
    broker.subscribe(topic, { qos: 2 }, (error, accepted) => {
        error ? console.log(error) : console.log(`${accepted[0].topic} was subscribed to!`);
    });
}

/* broker = accesses default MQTT broker commands
   publish/subscribe = convenience methods
*/

export default {
    broker, 
    publish,
    subscribe,
}