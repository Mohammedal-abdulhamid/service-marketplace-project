const { Review, User } = require("../models");

const addReview = async (req, res) => {
  try {
    const { service_id, reviewee_id, rating, comment } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const reviewer_id = req.user.user_id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const review = await Review.create({
      service_id,
      reviewer_id,
      reviewee_id,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add review" });
  }
};

const getServiceReviews = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const reviews = await Review.findAll({
      where: { service_id: serviceId },
      order: [["created_at", "DESC"]],
      include: [
        { model: User, as: "reviewer", attributes: ["user_id", "full_name"] },
      ],
    });

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch service reviews" });
  }
};

const getRecentReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      limit: 2,
      order: [["created_at", "DESC"]],
      include: [
        { model: User, as: "reviewer", attributes: ["user_id", "full_name"] },
      ],
    });

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

module.exports = { addReview, getServiceReviews, getRecentReviews };
