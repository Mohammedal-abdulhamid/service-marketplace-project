const Sequelize = require("sequelize");
const { sequelize } = require("../config/db");

const User = require("./user")(sequelize, Sequelize.DataTypes);
const Service = require("./service")(sequelize, Sequelize.DataTypes);
const Request = require("./request")(sequelize, Sequelize.DataTypes);

// Run associate functions
User.associate({ Service, Request });
Service.associate({ User });
User.hasMany(Service, { foreignKey: 'provider_id' });
Service.belongsTo(User, { foreignKey: 'provider_id' });

module.exports = { sequelize, User, Service, Request };
