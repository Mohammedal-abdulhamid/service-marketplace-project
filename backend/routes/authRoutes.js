const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); 
const router = express.Router();

// Public routes (no token needed)
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route (token required)
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: `Welcome, user ${req.user.id}!`, user: req.user });
});

module.exports = router;

