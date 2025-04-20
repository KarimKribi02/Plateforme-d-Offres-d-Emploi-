const express = require('express');
const router = express.Router();
const candidatureController = require('../controllers/candidature.controller');
// const authMiddleware = require('../middleware/auth'); // Si tu protèges les routes

router.post('/', candidatureController.create);
router.get('/mine', candidatureController.myCandidatures);

router.put('/:id/statut', candidatureController.updateStatut);

module.exports = router;
