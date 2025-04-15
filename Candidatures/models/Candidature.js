const mongoose = require('mongoose');

const candidatureSchema = new mongoose.Schema({
  offerId: { type: String, required: true },
  candidateId: { type: String, required: true },
  recruiterId: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Candidature', candidatureSchema);