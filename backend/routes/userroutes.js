const express = require('express');
const router = express.Router();
const {signupuser, getProfile, loginUser, updatePassword, updateProfile } = require('../controller/user');
const verifyUser = require('../middleware/authmiddleware');

// signup user
router.post('/signup', signupuser);

// Get user profile 
router.get('/profile', verifyUser, getProfile);

// Update profile 
router.put('/updateprofile', verifyUser, updateProfile);

// Update user password
router.put('/updatepass', verifyUser, updatePassword);

// Login user (no token required)
router.post('/login', loginUser);

module.exports = router;
