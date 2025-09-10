

const { Service, User } = require('../models');

const createService = async (req, res) => {
  try {
    const { title, description, price, role } = req.body; 
    const providerId = req.user?.user_id || req.user?.id || req.user;

    const service = await Service.create({
      title,
      description,
      price,
      role,             
      provider_id: providerId
    });

    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [{
        model: User,
        attributes: ['user_id', 'full_name', 'role']
      }]
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['user_id', 'full_name', 'role']
      }]
    });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    console.error('Error fetching service:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createService, getServices, getServiceById };
