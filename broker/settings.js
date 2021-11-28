import mqtt from 'mqtt';

const MQTT_BROKER_URI = `mqtt://host.docker.internal:${process.env.BROKER_PORT}`;
const MQTT_SETTINGS = {
    clean: true,
    connectTimeout: 4000,
    username: process.env.BROKER_USERNAME,
    password: process.env.BROKER_PASSWORD,
}

const broker = mqtt.connect(MQTT_BROKER_URI, MQTT_SETTINGS);

broker.on("error", (error) => {
    console.error(error.stack);
    broker.end();
});

broker.on("connect", () => console.log("Connected! Hello there, " + process.env.BROKER_USERNAME));

function publish(topic, message) {
    const options = {
        qos: 0,
        retain: false
    }
    broker.publish(topic, JSON.stringify(message), options);
}

function subscribe(topic) {
    broker.subscribe(topic, { qos: 0 }, (error, accepted) => {
        error ? console.log(error) : console.log(`${accepted[0].topic} was subscribed`);
    });
}

export default {
    publish,
    subscribe
}