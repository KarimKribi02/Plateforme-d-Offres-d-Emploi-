const express = require('express');
const router = express.Router();
const { register, login, createAdmin } = require('../controllers/auth.controller');
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth');

// Routes for admin to manage recruiters
router.post('/recruiters', authMiddleware, adminController.createRecruiter);
router.get('/recruiters', authMiddleware, adminController.getRecruiters);

router.post('/register', register);
router.post('/login', login);
router.post('/create-admin', createAdmin);

module.exports = router;
