import { broker } from './broker/broker.js';
import dotenv from 'dotenv'

dotenv.config();

// Variables
const PORT = process.env.NODE_DOCKER_PORT || 3002;
const MONGO_URI = `mongodb://mongodb:${process.env.MONGODB_DOCKER_PORT}/bookingDb`

// Connect to MongoDB
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//     console.error(`Failed to connect to MongoDB with URI: ${MONGO_URI}`);
//     console.error(err.stack);
//     process.exit(1);
// });

