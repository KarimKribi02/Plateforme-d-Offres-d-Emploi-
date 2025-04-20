const amqp = require("amqplib");
const Notification = require('./models/Notification');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

const consumeCandidatureEvents = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    const queue = "candidatures";

    await channel.assertQueue(queue, { durable: true });

    console.log(`[*] Waiting for messages in ${queue}. Press CTRL+C to exit.`);

    channel.consume(queue, async (msg) => {
      try {
        const data = JSON.parse(msg.content.toString());
        console.log(`📩 Received event: ${data.type}`);

        // Handle different event types
        switch (data.type) {
          case 'candidature.created':
            await handleCandidatureCreated(data);
            break;
          case 'candidature.updated':
            await handleCandidatureUpdated(data);
            break;
          default:
            console.log(`Unknown event type: ${data.type}`);
        }

        // Acknowledge message
        channel.ack(msg);
      } catch (error) {
        console.error('Error processing message:', error);
        // Reject the message and don't requeue
        channel.nack(msg, false, false);
      }
    });
  } catch (err) {
    console.error("Error in RabbitMQ consumer:", err.message);
    // Attempt to reconnect after a delay
    setTimeout(consumeCandidatureEvents, 5000);
  }
};

// Handler for candidature.created event
const handleCandidatureCreated = async (data) => {
  try {
    // Create notification for recruiter
    const notification = new Notification({
      recipient: data.recruiterId,
      content: `New application received for job posting: ${data.jobTitle}`,
      resourceId: data.candidatureId,
      type: 'candidature.created'
    });
    
    await notification.save();
    console.log(`Created notification for recruiter ${data.recruiterId}`);
  } catch (error) {
    console.error('Error creating candidature.created notification:', error);
  }
};

// Handler for candidature.updated event
const handleCandidatureUpdated = async (data) => {
  try {
    // Create notification for candidate
    const notification = new Notification({
      recipient: data.candidateId,
      content: `Your application status for ${data.jobTitle} has been updated to "${data.newStatus}"`,
      resourceId: data.candidatureId,
      type: 'candidature.updated'
    });
    
    await notification.save();
    console.log(`Created notification for candidate ${data.candidateId}`);
  } catch (error) {
    console.error('Error creating candidature.updated notification:', error);
  }
};

module.exports = consumeCandidatureEvents; 