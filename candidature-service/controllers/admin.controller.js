const axios = require('axios');

// View all offers (proxy to the Laravel service)
exports.getAllOffers = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const response = await axios.get('http://localhost:8000/api/offres');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ message: 'Error fetching offers from main service' });
  }
};

// View all candidatures
exports.getAllCandidatures = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const Candidature = require('../models/candidature.model');
    const candidatures = await Candidature.find();
    res.json(candidatures);
  } catch (error) {
    console.error('Error fetching candidatures:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 