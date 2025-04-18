const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const candidatureRoutes = require('./routes/candidature.routes');

const app = express();
app.use(express.json());
app.use('/api/candidatures', candidatureRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(3002, () => console.log('Candidature service running on port 3002'));
    })
    .catch(err => console.error(err));
