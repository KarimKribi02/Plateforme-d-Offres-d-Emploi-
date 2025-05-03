const express = require('express');
const consumeEvents = require('./consumer');
const { connectRabbitMQ } = require('./rabbitmq');
const notificationService = require('./notification-service');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Notification Service Running');
});

// New endpoint to get all notifications
app.get('/notifications', (req, res) => {
  const allNotifications = notificationService.getAllNotifications();
  res.json(allNotifications);
});

const PORT = process.env.PORT || 5003;

app.listen(PORT, async () => {
  console.log(`Notification Service running on port ${PORT}`);
  
  // Connect to RabbitMQ
  await connectRabbitMQ();
  
  // Start consuming events
  consumeEvents();
}); 