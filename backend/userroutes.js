const express = require('express');
const router = express.Router();
const { updatepass, loginuser, updateprofile } = require('./controller/user');

// Signup user
// router.post('/signup', signupuser);

//update profile
router.put('/updateprofile/:id', updateprofile)

// Update user password by ID (protected route)
router.put('/updatepass/:id', updatepass); 

// Login user
router.post('/login', loginuser);

module.exports = router;
