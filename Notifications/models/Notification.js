const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  type: {
    type: String,
    enum: ['candidature.created', 'candidature.updated'],
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', notificationSchema); 