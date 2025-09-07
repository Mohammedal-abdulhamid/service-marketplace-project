const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Service = sequelize.define('Service', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  providerId: { type: DataTypes.INTEGER, allowNull: false } // FK to User
}, {
  timestamps: true
});

module.exports = Service;
