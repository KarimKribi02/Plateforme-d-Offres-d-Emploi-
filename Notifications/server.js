const express = require('express');
const mongoose = require('mongoose');
const consumeCandidatureEvents = require('./consumer');
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/notifications';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Notification Service Running');
});

// API routes
app.use('/api/notifications', require('./routes/notification'));

// Start server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
  
  // Start consuming messages from RabbitMQ
  consumeCandidatureEvents()
    .catch(err => console.error('Failed to start RabbitMQ consumer:', err));
}); 