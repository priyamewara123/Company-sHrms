const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Use the createUser function as middleware
router.post('/create', userController.createUser);

module.exports = router;
