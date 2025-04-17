require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Environment variables
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/authentification-service';
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB connection error', err));

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`)); 