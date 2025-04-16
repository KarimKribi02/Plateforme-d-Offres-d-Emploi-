const mongoose = require('mongoose');

const candidatureSchema = new mongoose.Schema({
  offreId: { type: String, required: true }, // ID de l’offre
  candidatId: { type: String, required: true }, // ID du candidat
  statut: {
    type: String,
    enum: ['en attente', 'acceptée', 'refusée'],
    default: 'en attente'
  },
  lettreMotivation: String,
  datePostulation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Candidature', candidatureSchema);
