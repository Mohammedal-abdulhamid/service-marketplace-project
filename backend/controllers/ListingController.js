const Listing = require('../models/Listing');
const User = require('../models/User');

const createListing = async (req, res) => {
  try {
    const { title, description, price, category, location } = req.body;
    const listing = await Listing.create({
      title,
      description,
      price,
      category,
      location,
      userId: req.user.id  
    });
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getListings = async (req, res) => {
  try {
    const listings = await Listing.findAll({ include: User });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id, { include: User });
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    if (listing.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await listing.update(req.body);
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    if (listing.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await listing.destroy();
    res.json({ message: 'Listing deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createListing, getListings, getListingById, updateListing, deleteListing };
