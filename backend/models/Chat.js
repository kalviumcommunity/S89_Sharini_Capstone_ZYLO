const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  isEventRoom: {
    type: Boolean,
    default: false
  },
  eventName: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const messageSchema = new mongoose.Schema({
  chatRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRoom'
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
  isSecret: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date
  }
}, {
  timestamps: true
});

exports.ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
exports.Message = mongoose.model('Message', messageSchema);
