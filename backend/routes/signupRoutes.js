
const express = require('express');
const router = express.Router();
const {signUpDetails , loginDetails, getUser} = require('../controllers/signupController');
// Use the signUpDetails function as middleware
router.post('/signup', signUpDetails);
router.post('/login', loginDetails);
router.get('/getUsers',getUser);
module.exports = router;
