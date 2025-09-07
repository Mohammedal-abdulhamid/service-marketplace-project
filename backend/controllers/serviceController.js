const Service = require('../models/Service');

const createService = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const providerId = req.user.id; 

    const service = await Service.create({ title, description, price, providerId });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createService, getServices };
