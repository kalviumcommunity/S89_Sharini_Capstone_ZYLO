const mongoose = require('mongoose');

const eventRoomSchema = new mongoose.Schema({
  eventName: String,
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isActive: Boolean
}, { timestamps: true });

const Event = mongoose.model('EventRoom', eventRoomSchema);

module.exports = Event
