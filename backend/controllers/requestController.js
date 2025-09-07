const Request = require('../models/Request');

// Create a new request 
const createRequest = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    const request = await Request.create({
      title,
      description,
      budget,
      userId: req.user.id   
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all requests (public)
const getRequests = async (req, res) => {
  try {
    const requests = await Request.findAll();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRequest, getRequests };
