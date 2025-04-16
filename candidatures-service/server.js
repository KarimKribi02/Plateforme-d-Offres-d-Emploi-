const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());

// Routes
app.use('/api/candidatures', require('./src/routes/candidatureRoutes'));

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => console.log(`Candidature service running on port ${PORT}`));
