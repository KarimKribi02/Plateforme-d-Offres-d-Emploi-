const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(3001, () => console.log('Auth service running on port 3001'));
    })
    .catch(err => console.error(err));
