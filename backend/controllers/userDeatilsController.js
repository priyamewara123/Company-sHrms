const userDetails = require('../models/userDetailsModel');
const SignupUser = require('../models/signupModel');
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination folder for file uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set the file name
  },
});

const upload = multer({ storage: storage });

const createUser = async (req, res) => {
    try {
        const { personalDetails, addressDetails, qualificationDetails, experienceDetails } = req.body;
        const email = req.body.personalDetails.Email;
        console.log("email",email);

         // Handle file upload
        
         const profilePicture = req.file ? req.file.filename : { data: 'base64_encoded_data_here', contentType: 'image/jpeg' };


        const existingSignupUser = await SignupUser.findOne({ email });
         console.log("rrrr",existingSignupUser);
         
        if (!existingSignupUser) {
          return res.status(400).json({ success: false, message: 'User not found' });
        }
        const user = new userDetails({
          userId: existingSignupUser._id,
           personalDetails: { ...personalDetails, profilePicture },
          addressDetails,
          qualificationDetails,
          experienceDetails,
        });
    console.log("user details",user);
        await user.save();

    return res.status(201).json({ success: true, message: 'User details saved successfully', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const { Email } = req.params; // Assuming userId is passed as a parameter in the URL
    const { personalDetails, addressDetails, qualificationDetails, experienceDetails } = req.body;

    // Find the existing user details based on userId
    const existingUser = await userDetails.findOne({ Email });
   console.log("exitingUser",existingUser);
    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    existingUser.personalDetails = { ...personalDetails, profilePicture: existingUser.personalDetails.profilePicture };
    existingUser.addressDetails = addressDetails;
    existingUser.qualificationDetails = qualificationDetails;
    existingUser.experienceDetails = experienceDetails;

    // Handle profile picture upload
    if (req.file) {
      existingUser.personalDetails.profilePicture = req.file.filename;
    }

    // Save the updated user details
    await existingUser.save();
    return res.status(200).json({ success: true, message: 'User details updated successfully', user: existingUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
};
