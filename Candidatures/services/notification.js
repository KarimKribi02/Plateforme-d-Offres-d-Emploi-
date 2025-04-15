const amqp = require('amqplib');

let channel = null;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue('notifications', { durable: true });
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
  }
}

async function publishEvent(eventType, data) {
  if (!channel) {
    await connectRabbitMQ();
  }

  const message = JSON.stringify({ eventType, data });
  channel.sendToQueue('notifications', Buffer.from(message), { persistent: true });
  console.log(`Event published: ${eventType}`);
}

module.exports = { publishEvent };