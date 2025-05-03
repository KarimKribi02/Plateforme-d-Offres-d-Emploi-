const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const candidatureRoutes = require('./routes/candidature.routes');
const adminRoutes = require('./routes/admin.routes');
const { connectRabbitMQ } = require('./utils/rabbitmq');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use('/api/candidatures', candidatureRoutes);
app.use('/api/admin', adminRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        
        // Connect to RabbitMQ
        await connectRabbitMQ();
        
        app.listen(3002, () => console.log('Candidature service running on port 3002'));
    })
    .catch(err => console.error(err));
