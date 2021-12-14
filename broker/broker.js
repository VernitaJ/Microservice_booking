import mqtt from 'mqtt';
import dotenv from 'dotenv';
import BookingHandler from './handler/bookingHandler.js';
import DataHandler from './handler/dataHandler.js';
import CircuitBreaker from 'opossum';

const MQTT_BROKER_URI = `mqtt://host.docker.internal:${process.env.BROKER_PORT}`;
const MQTT_LOCALHOST_URI = `mqtt://localhost:1883`

const BOOKING_FRONTEND_TOPIC = "frontend/booking/#"; 
const BOOKING_REQRES_TOPIC = "dentistimo/booking/#";

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

// Initialise circuit breaker beforehand
const bookingRequestBreaker = new CircuitBreaker(BookingHandler.handleBookingRequest, CIRCUIT_BREAKER_SETTINGS);
const dataRequestBreaker = new CircuitBreaker(DataHandler.handleDataRequest, CIRCUIT_BREAKER_SETTINGS);

const broker = mqtt.connect(MQTT_BROKER_URI, MQTT_SETTINGS);


const EXAMPLE_PAYLOAD = {
    requestId: '123123',
    clinicId: '12312132',
    startAt: '1123123123123',
    endAt: '123123312231'
}

const TEST_RESPONSE = {
    response: 'approve'
}

broker.on("connect", () => {
    console.log("Connected! Hello there, " + process.env.BROKER_USERNAME || "undefined user!");
    
    subscribe(BOOKING_REQRES_TOPIC);
    subscribe(BOOKING_FRONTEND_TOPIC);

    publish("dentistimo/booking/req", EXAMPLE_PAYLOAD)

    setTimeout(function() {
        publish(`dentistimo/booking/availability/${EXAMPLE_PAYLOAD.requestId}/res`, TEST_RESPONSE)
    }, 2000)
});

broker.on("message", (topic, message) => {
    if (topic === "dentistimo/booking/req") {
        bookingRequestBreaker.fallback(() => console.log("Could not accept request at this time!"))
        bookingRequestBreaker.fire(message.toString("utf-8"))
            .then(console.log("Request accepted!"))
            .catch(console.error);
    }

    if (topic === `frontend/booking/confirmation/req`) {
        console.log(message.toString("utf-8"));
        dataRequestBreaker.fallback(() => console.log("Could not accept request at this time!"))
        dataRequestBreaker.fire(message.toString("utf-8"))
            .then(console.log("Request accepted!"))
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