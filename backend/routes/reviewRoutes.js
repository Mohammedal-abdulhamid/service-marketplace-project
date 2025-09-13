const express = require("express");
const { addReview, getRecentReviews, getServiceReviews } = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add review → must be logged in
router.post("/", authMiddleware, addReview);

// Get last 2 reviews (site-wide)
router.get("/recent", getRecentReviews);

// Get reviews for one service
router.get("/service/:serviceId", getServiceReviews);

module.exports = router;
