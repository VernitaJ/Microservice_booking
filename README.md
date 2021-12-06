# Booking 
A microservice that takes in booking requests, passes booking confirmations to the user, and saves booking confirmations to MongoDB, using NodeJS and MQTT.

## Getting started 
- Create an .env file with the following template in the .env.sample file.

- `docker-compose up --build` to run!

## To run stand-alone locally:
- `npm install` + `npm start`
- Needs minor modifications under the hood to run locally. In `broker.js`, connect the MQTT to the `MQTT_LOCALHOST_URI` variable. Finally, in `main.js`, use the `LOCAL_MONGO_URI` to connect to a MongoDB instance.