const amqp = require("amqplib");

const RABBITMQ_URL = "amqp://localhost";
let channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    
    // Queues for candidature events
    await channel.assertQueue("candidature.created", { durable: true });
    await channel.assertQueue("candidature.updated", { durable: true });
    
    console.log("[RabbitMQ] Connected and channels ready");
  } catch (err) {
    console.error("[RabbitMQ] Connection failed:", err.message);
  }
};

// Publish event when a new candidature is created
const publishCandidatureCreated = (data) => {
  if (!channel) {
    console.error("[RabbitMQ] Channel not ready");
    return;
  }

  const buffer = Buffer.from(JSON.stringify(data));
  channel.sendToQueue("candidature.created", buffer);
  console.log("[RabbitMQ] Published candidature.created event");
};

// Publish event when a candidature status is updated
const publishCandidatureUpdated = (data) => {
  if (!channel) {
    console.error("[RabbitMQ] Channel not ready");
    return;
  }

  const buffer = Buffer.from(JSON.stringify(data));
  channel.sendToQueue("candidature.updated", buffer);
  console.log("[RabbitMQ] Published candidature.updated event");
};

module.exports = {
  connectRabbitMQ,
  publishCandidatureCreated,
  publishCandidatureUpdated
}; 