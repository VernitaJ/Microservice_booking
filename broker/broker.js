import mqtt from 'mqtt';
import dotenv from 'dotenv';
import BookingHandler from './handler/bookingHandler.js';
import DataHandler from './handler/dataHandler.js';

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
const broker = mqtt.connect(MQTT_BROKER_URI, MQTT_SETTINGS);

broker.on("connect", () => {
    console.log("Connected! Hello there, " + process.env.BROKER_USERNAME || "undefined user!");
    
    subscribe(BOOKING_REQRES_TOPIC);
    subscribe(BOOKING_FRONTEND_TOPIC);
});

broker.on("message", (topic, message) => {
    if (topic === "dentistimo/booking/req") {
        console.log(message.toString("utf-8"));
        BookingHandler.handleBookingRequest(message.toString("utf-8"));
    }
    if (topic === `dentistimo/booking/availability/${message.requestId}/res`) {
        console.log(message.toString("utf-8"));
        BookingHandler.handleBookingResponse(message.toString("utf-8"));
    }
    if (topic === `frontend/booking/req`) {
        console.log(message.toString("utf-8"));
        DataHandler.handleDataRequest(message);
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