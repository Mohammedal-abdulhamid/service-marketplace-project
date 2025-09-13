const express = require('express');
const { sendMessage, getMessagesByService } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Send a message (logged-in users only)
router.post('/', authMiddleware, sendMessage);

// Get messages for a specific service
router.get('/service/:serviceId', authMiddleware, getMessagesByService);

module.exports = router;
