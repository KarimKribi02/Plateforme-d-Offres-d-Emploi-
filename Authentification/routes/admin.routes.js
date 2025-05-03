const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth');

// Routes for admin to manage recruiters
router.post('/recruiters', authMiddleware, adminController.createRecruiter);
router.get('/recruiters', authMiddleware, adminController.getRecruiters);

module.exports = router; 