const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // Assuming you're using multer for handling form data

const { createUser, updateUser } = require('../controllers/userDeatilsController'); // Make sure the correct path is used

// API endpoint to create user profile with a profile picture
router.post('/createUser', upload.single('profilePicture'), createUser);

// API endpoint to update user profile with a profile picture
router.put('/updateUser', upload.single('profilePicture'), updateUser);

module.exports = router;
