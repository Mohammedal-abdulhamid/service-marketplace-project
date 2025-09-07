const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Request = sequelize.define('Request', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  budget: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('open', 'assigned', 'completed'),
    defaultValue: 'open'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Associations
User.hasMany(Request, { foreignKey: 'userId' });
Request.belongsTo(User, { foreignKey: 'userId' });

module.exports = Request;
