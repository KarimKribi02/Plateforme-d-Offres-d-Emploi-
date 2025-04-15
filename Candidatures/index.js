require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const candidatureRoutes = require('./routes/candidatures');
const { publishEvent } = require('./services/notification');

const app = express();

// Connexion à MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/candidatures', candidatureRoutes); // Ligne 16, où l'erreur se produit

// Démarrer le serveur
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Candidature service running on port ${PORT}`);
});