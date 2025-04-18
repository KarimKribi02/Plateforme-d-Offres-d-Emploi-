const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const controller = require('../controllers/candidature.controller');

router.post('/', auth, controller.create);
router.get('/me', auth, controller.myCandidatures);
router.put('/:id/statut', auth, controller.updateStatut);


module.exports = router;
