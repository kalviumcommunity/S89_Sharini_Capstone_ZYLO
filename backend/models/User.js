const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:{
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
  WorkEducation: {
    type: String,
  },
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  settings: { 
    contactsOnly: Boolean,
    secretChatMode: Boolean
  }
}, { timestamps: true });

const user = mongoose.model('User', userSchema);

module.exports = user;
