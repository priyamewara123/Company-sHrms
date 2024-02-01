const SignupUser = require('../models/signupModel');
const LoginUser=require('../models/loginModel')
const signUpDetails = async (req, res) => {

  try {
    const { username, email, country, password,signupDate } = req.body;
    console.log('Received request with data:',req.body);
    
    // Check if the email already exists in the database
    const existingUser = await SignupUser.findOne({ email });
    console.log('Existing user:', existingUser);
    
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already in use. Please choose another.' });
    }
    
    const newsignup = new SignupUser({
      username,
      email,
      country,
      password,
     
    });
    
    await newsignup.save()
    .then(() => {
      console.log('Registration successful');
      res.status(201).json({ success: true, message: 'Registration successful' });
    })
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
const loginDetails = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await SignupUser.findOne({ email });
    console.log(email);
    console.log(existingUser);

    if (!existingUser || password !== existingUser.password) {
      return res.status(401).json({ success: false, message: 'Incorrect username or password' });
    }

    res.status(200).json({ success: true, message: 'Login successful', user: existingUser });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

};


const getUser = async (req, res) => {
  try {
    const users = await SignupUser.find();
    res.status(200).json({
      success:"true",
      users:users
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUpDetails,
  loginDetails,
  getUser
};



