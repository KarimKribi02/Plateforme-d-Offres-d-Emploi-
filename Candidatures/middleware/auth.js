const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Contient userId et role

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = auth;
const express = require('express');
const router = express.Router();
const Candidature = require('../models/Candidature');
const auth = require('../middleware/auth');
const { publishEvent } = require('../services/notification');

// Créer une candidature (candidat uniquement)
router.post('/', auth(['candidate']), async (req, res) => {
  const { offerId, recruiterId } = req.body;

  try {
    const candidature = new Candidature({
      offerId,
      candidateId: req.user.userId,
      recruiterId,
      status: 'pending',
    });

    await candidature.save();

    // Publier l'événement candidature.created
    await publishEvent('candidature.created', {
      candidatureId: candidature._id,
      offerId,
      candidateId: req.user.userId,
      recruiterId,
    });

    res.status(201).json(candidature);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Consulter ses candidatures (candidat)
router.get('/my-candidatures', auth(['candidate']), async (req, res) => {
  try {
    const candidatures = await Candidature.find({ candidateId: req.user.userId });
    res.json(candidatures);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Consulter les candidatures d'une offre (recruteur)
router.get('/offer/:offerId', auth(['recruiter']), async (req, res) => {
  try {
    const candidatures = await Candidature.find({
      offerId: req.params.offerId,
      recruiterId: req.user.userId,
    });
    res.json(candidatures);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Mettre à jour le statut d'une candidature (recruteur)
router.patch('/:id', auth(['recruiter']), async (req, res) => {
  const { status } = req.body;

  try {
    const candidature = await Candidature.findOne({
      _id: req.params.id,
      recruiterId: req.user.userId,
    });

    if (!candidature) {
      return res.status(404).json({ message: 'Candidature not found' });
    }

    candidature.status = status;
    candidature.updatedAt = Date.now();
    await candidature.save();

    // Publier l'événement candidature.updated
    await publishEvent('candidature.updated', {
      candidatureId: candidature._id,
      candidateId: candidature.candidateId,
      status,
    });

    res.json(candidature);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;