import dotenv from 'dotenv'
import mongoose from 'mongoose';
import broker from './broker/broker.js'

dotenv.config();

// Variables
const MONGO_URI = `mongodb://mongodb:${process.env.MONGODB_DOCKER_PORT}/bookingDB`;
const LOCAL_MONGO_URI = `mongodb://localhost:${process.env.MONGODB_DOCKER_PORT}/bookingDB`

mongoose.connect(
    MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
      if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${MONGO_URI}`);
        console.error(err.stack);
        process.exit(1);
      }
      console.log(`Connected to MongoDB with URI: ${MONGO_URI}`);
    }
);

broker.broker;