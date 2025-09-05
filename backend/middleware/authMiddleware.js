const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Public routes (no auth required)
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
