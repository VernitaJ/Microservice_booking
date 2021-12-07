# Booking 
A microservice that takes in booking requests, passes booking confirmations to the user, and saves booking confirmations to MongoDB, using NodeJS and MQTT.

## Getting started 
- Create an .env file with the following template in the .env.sample file.

- `docker-compose up --build` to run!

## To run stand-alone locally:
- `npm install` + `npm start`
- Needs minor modifications under the hood to run locally. In `broker.js`, connect the MQTT to the `MQTT_LOCALHOST_URI` variable. Finally, in `main.js`, use the `LOCAL_MONGO_URI` to connect to a MongoDB instance.

## To retrieve data from database:
- Create a request with this following body:

```JSON
{
"requestId": "uniqueId",
"requestType": "getOne",
"requestParam": "<insert id of confirmation as request>"
}

- @requestTypes:
    - getConfirmation (gets one confirmation with the id as a requestParam)
    - getAllConfirmations (gets all confirmations with the page and page size as a requestParam)
    - deleteConfirmation (deletes confirmation with that specific ID as a request param)
```
