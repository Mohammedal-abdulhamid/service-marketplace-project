const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Listing = require('./Listing');

const Review = sequelize.define('Review', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  comment: { type: DataTypes.TEXT }
}, { timestamps: true });

Review.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Review, { foreignKey: 'userId' });

Review.belongsTo(Listing, { foreignKey: 'listingId', onDelete: 'CASCADE' });
Listing.hasMany(Review, { foreignKey: 'listingId' });

module.exports = Review;
