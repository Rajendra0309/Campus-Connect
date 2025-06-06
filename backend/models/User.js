const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
    default: 'student'
  },
  department: {
    type: String,
    required: true
  },
  semester: {
    type: Number
  },
  skills: [String],
  achievements: [String],
  projects: [{
    title: String,
    description: String,
    link: String
  }],
  socialLinks: {
    github: String,
    linkedin: String,
    website: String
  },
  profilePicture: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
