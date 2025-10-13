const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  description: String,
  reactions: {
    like: { type: Number, default: 0 },
    love: { type: Number, default: 0 },
  },
  comments: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      text: String,
    },
  ],
}, { timestamps: true });

const Memory = mongoose.model('Memory', memorySchema);

module.exports = Memory;
