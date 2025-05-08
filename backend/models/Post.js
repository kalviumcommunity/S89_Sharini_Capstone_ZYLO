const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: true },
  caption: { type: String, required: true },
  description: { type: String },

  filters: [String],

  reactions: [{
    type: { type: String }, 
    value: String,          
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],

  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const Memories = mongoose.model('Post', postSchema);

module.exports = Memories;
