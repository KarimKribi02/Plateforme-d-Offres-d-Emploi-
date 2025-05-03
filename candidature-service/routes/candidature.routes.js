const express = require('express');
const router = express.Router();
const candidatureController = require('../controllers/candidature.controller');
const adminController = require('../controllers/admin.controller');
// const authMiddleware = require('../middleware/auth'); // Si tu protèges les routes
const authMiddleware = require('../middleware/auth');


// Admin routes for offers and candidatures
router.get('/offers', authMiddleware, adminController.getAllOffers);
router.get('/candidatures', authMiddleware, adminController.getAllCandidatures);

router.post('/', authMiddleware, candidatureController.create);
router.get('/mine', authMiddleware, candidatureController.myCandidatures);
router.put('/:id/statut', authMiddleware, candidatureController.updateStatut);

module.exports = router;
