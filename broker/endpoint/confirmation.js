import broker from "../broker.js";
import ConfirmationCommands from '../../command/confirmation.js'
import ConfirmationService from '../../service/confirmation.js';
import CircuitBreaker from 'opossum';

const brokerOptions = {
    timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 30000 // After 30 seconds, try again.
};

// TODO: Decide whether topics or messages are uniquely identified 
const publishConfirmation = (message) => {
    const randomisedTopic = broker.randomiseTopic;
    const jsonMessage = JSON.parse(message);
    const { error } = ConfirmationCommands.createConfirmation.validate(message);
    
    if (error) {
        broker.publish(broker.BOOKING_CONFIRMATION_TOPIC + randomisedTopic, "Invalid message!")
    }

    const breaker = new CircuitBreaker(ConfirmationService.createConfirmation(jsonMessage), brokerOptions);
    
    breaker.fire(broker.publish(broker.BOOKING_CONFIRMATION_TOPIC + randomisedTopic, jsonMessage))
        .then(console.log)
        .error(console.error);
}