const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const signupRoutes = require('./routes/signupRoutes');
const userDetailsRoutes=require('./routes/userDetailsRoutes')
// han
const userModel= require('./models/userModel');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userInfo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if MongoDB is connected successfully
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// han
app.get('/getUser', (req, res) =>{
userModel.find()
.then(users => res.json(users))
.catch(err => res.json(err))
})

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/users', signupRoutes);
app.use('/users', signupRoutes);
app.use('/users', userDetailsRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
