const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');
const cors = require('cors');

const app = express(); // 👈 Déclarer l'app d'abord !

// ✅ Utiliser cors après avoir créé l'app
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.use(express.json());
app.use('/api/auth', authRoutes);

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3001, () => console.log('Auth service running on port 3001'));
  })
  .catch(err => console.error(err));
