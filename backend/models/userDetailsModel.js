const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'signupusers' },
  personalDetails: {
    Email:String,
    fathersName: String,
    dob: Date,
    motherName: String,
    gender: String,
    profilePicture: {
      data: { type: String, default: 'base64_encoded_data_here' },
      contentType: { type: String, default: 'image/jpeg' }
    },
  },
  addressDetails: [{
    address: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
  }],
  qualificationDetails: [ {
    course: String,
    university: String,
    branch: String,
    startyear: String,
    endyear: String,
    aggregate: String,
  }],
  experienceDetails: [{
    experience:String,
    position: String,
    startYear: String,
    endYear: String,
    role: String,
  }],
});

const userDetails = mongoose.model('userDetails', userSchema);

module.exports = userDetails;
