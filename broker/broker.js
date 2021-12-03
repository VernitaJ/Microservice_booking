import mqtt from 'mqtt';

const MQTT_BROKER_URI = `mqtt://localhost:1883`;
const BOOKING_FRONTEND_TOPIC = "frontend/dentistId/booking"; 
const BOOKING_CONFIRMATION_TOPIC = "booking/dentist/";

const MQTT_SETTINGS = {
    clean: true,
    connectTimeout: 4000,
    username: "booking_service",
    password: "booking",
}

const broker = mqtt.connect(MQTT_BROKER_URI, MQTT_SETTINGS);

broker.subscribe(BOOKING_FRONTEND_TOPIC);

broker.on("connect", () => console.log("Connected! Hello there, " + process.env.BROKER_USERNAME || "undefined user!"));

broker.on("message", (topic, message) => {
    
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
        qos: 0,
        retain: false
    }
    broker.publish(topic, JSON.stringify(message), options);
}

// Subscribes to MQTT
const subscribe = (topic) => {
    broker.subscribe(topic, { qos: 0 }, (error, accepted) => {
        error ? console.log(error) : console.log(`${accepted[0].topic} was subscribed`);
    });
}

const randomiseTopic = () => crypto.randomBytes(20).toString("hex");
/* broker = accesses default MQTT broker commands
   publish/subscribe = convenience methods
*/
export default {
    broker, 
    publish,
    subscribe,
    randomiseTopic,
    BOOKING_FRONTEND_TOPIC,
    BOOKING_CONFIRMATION_TOPIC
}