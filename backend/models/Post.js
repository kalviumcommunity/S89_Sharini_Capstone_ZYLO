const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: String,
  caption: String,
  filters: [String],
  reactions: [{
    type: { type: String },
    value: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: Date
  }]
}, { timestamps: true });

const post = mongoose.model('Post', postSchema);

module.exports = post;
