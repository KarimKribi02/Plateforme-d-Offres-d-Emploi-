const mongoose = require('mongoose');

const candidatureSchema = new mongoose.Schema({
  offreId: String,
  candidatId: String,
  statut: { type: String, enum: ['en attente', 'acceptée', 'refusée'], default: 'en attente' },
  message: String
}, { timestamps: true });

module.exports = mongoose.model('Candidature', candidatureSchema);
