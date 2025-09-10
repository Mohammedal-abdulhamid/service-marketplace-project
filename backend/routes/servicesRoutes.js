const express = require('express');
const { createService, getServiceById, getServices, } = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route - only logged-in users can create services
router.post('/', authMiddleware, createService);

// Public route - anyone can view services
router.get('/', getServices);

// Get singal service by ID
router.get("/:id", getServiceById);

module.exports = router;
