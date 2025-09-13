const express = require('express');
const { createRequest, getRequests } = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

// Protected - seekers must be logged in to post
router.post('/', authMiddleware, createRequest);

// Public - anyone can browse requests
router.get('/', getRequests);

// POST /api/requests
router.post("/", authMiddleware, createRequest);

module.exports = router;
