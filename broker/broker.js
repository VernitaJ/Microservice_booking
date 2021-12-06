import mqtt from 'mqtt';
import confirmationHandler from './handler/handler.js';

const MQTT_BROKER_URI = `mqtt://host.docker.internal:${process.env.BROKER_PORT}`;
const MQTT_LOCALBROKER_URI = `mqtt://localhost:1883`

const BOOKING_FRONTEND_TOPIC = "frontend/booking/"; 
const BOOKING_REQRES_TOPIC = "dentistimo/booking/";

const MQTT_SETTINGS = {
    clean: true,
    connectTimeout: 4000,
    username: process.env.BROKER_USERNAME || "booking_service",
    password: process.env.BROKER_PASSWORD || "booking",
}

const theLoad = {
    userId: "sadasd",
    requestId: "asdasd",
    dentistId: "asddsa",
    issuance: "asdasdds",
    date: Date.now(),
    time: "23:30",
    approved: "approve"
}

const broker = mqtt.connect(MQTT_LOCALBROKER_URI, MQTT_SETTINGS);

broker.on("connect", () => {
    console.log("Connected! Hello there, " + process.env.BROKER_USERNAME || "undefined user!");
    subscribe(BOOKING_REQRES_TOPIC);
    subscribe(BOOKING_FRONTEND_TOPIC);
    publish(BOOKING_REQRES_TOPIC+"req", theLoad)
});

broker.on("message", (topic, message) => {
    console.log("test");
    if (topic === BOOKING_REQRES_TOPIC + "req") {
        console.log("hi");
        confirmationHandler(message);
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
    BOOKING_FRONTEND_TOPIC,
    BOOKING_REQRES_TOPIC
}