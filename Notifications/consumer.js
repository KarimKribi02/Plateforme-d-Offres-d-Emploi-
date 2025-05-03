const amqp = require("amqplib");
const notificationService = require("./notification-service");

const RABBITMQ_URL = "amqp://localhost";

const consumeEvents = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Setup queues
    await channel.assertQueue("candidature.created", { durable: true });
    await channel.assertQueue("candidature.updated", { durable: true });

    console.log("[*] Waiting for notification events. Press CTRL+C to exit.");

    // Handle new candidature events
    channel.consume("candidature.created", async (msg) => {
      try {
        const data = JSON.parse(msg.content.toString());
        console.log(`📩 New candidature received: ${data.candidatId} applied to job ${data.offreId}`);
        
        // Notify recruiter about new application
        await notificationService.notifyRecruiter(data);
        
        // Acknowledge message
        channel.ack(msg);
      } catch (error) {
        console.error("Error processing candidature.created event:", error);
        channel.nack(msg, false, false); // Reject message without requeue
      }
    });

    // Handle candidature status updates
    channel.consume("candidature.updated", async (msg) => {
      try {
        const data = JSON.parse(msg.content.toString());
        console.log(`📩 Candidature status updated: ${data.candidatId}'s application status changed to ${data.statut}`);
        
        // Notify candidate about status change
        await notificationService.notifyCandidate(data);
        
        // Acknowledge message
        channel.ack(msg);
      } catch (error) {
        console.error("Error processing candidature.updated event:", error);
        channel.nack(msg, false, false); // Reject message without requeue
      }
    });
  } catch (err) {
    console.error("Error in RabbitMQ consumer:", err.message);
  }
};

module.exports = consumeEvents; 