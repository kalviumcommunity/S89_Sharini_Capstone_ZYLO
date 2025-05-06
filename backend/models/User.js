const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type:String,
  },
  email: { type: String, required: true, unique: true },
  profileImage: {
    type:String,
    default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  },
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
