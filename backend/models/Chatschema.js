const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    ref: 'User',
    required: true
  },
  receiver: {
    type: String,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'image', 'gif', 'music'],
    default: 'text'
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;