const express = require('express');
const router = express.Router();
const {
  createCandidature,
  getMesCandidatures,
  getCandidaturesOffre,
  updateStatutCandidature
} = require('../controllers/candidatureController');

// Middleware d'authentification (exemple)
const auth = require('../middlewares/auth');

router.post('/', createCandidature);
router.get('/me', auth('candidat'), getMesCandidatures);
router.get('/offre/:offreId', auth('recruteur'), getCandidaturesOffre);
router.put('/:id/statut', auth('recruteur'), updateStatutCandidature);

module.exports = router;
