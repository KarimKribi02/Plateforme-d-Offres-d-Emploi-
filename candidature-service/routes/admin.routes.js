const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth');

// Admin routes for offers and candidatures
router.get('/offers', authMiddleware, adminController.getAllOffers);
router.get('/candidatures', authMiddleware, adminController.getAllCandidatures);

module.exports = router; 