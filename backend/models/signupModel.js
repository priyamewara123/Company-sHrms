const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true, 
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  signupDate: {     type: String,
    default: () => new Date().toLocaleDateString('en-US'),  }
  
});

const SignupUser = mongoose.model('signupUser', signupSchema);

module.exports = SignupUser;
