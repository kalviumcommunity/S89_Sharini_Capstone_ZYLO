const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type:String,
  },
  email: String,
  password: String,
  profileImage: String,
  bio: String,
  location: String,
  interests: [String],
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isOnline: Boolean,
  settings: {
    contactsOnly: Boolean,
    secretChatMode: Boolean
  }
}, { timestamps: true });

const user = mongoose.model('User', userSchema);

module.exports = user;
