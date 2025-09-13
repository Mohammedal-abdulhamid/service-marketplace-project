const Sequelize = require("sequelize");
const { sequelize } = require("../config/db");

// Import models
const User = require("./user")(sequelize, Sequelize.DataTypes);
const Service = require("./service")(sequelize, Sequelize.DataTypes);
const Request = require("./request")(sequelize, Sequelize.DataTypes);
const Message = require("./message")(sequelize, Sequelize.DataTypes);
const Review = require("./review")(sequelize, Sequelize.DataTypes);

// Associations
User.hasMany(Service, { foreignKey: "provider_id" });
Service.belongsTo(User, { foreignKey: "provider_id" });

User.hasMany(Message, { foreignKey: "sender_id" });
User.hasMany(Message, { foreignKey: "receiver_id" });
Message.belongsTo(User, { as: "sender", foreignKey: "sender_id" });
Message.belongsTo(User, { as: "receiver", foreignKey: "receiver_id" });

Service.hasMany(Message, { foreignKey: "service_id" });
Message.belongsTo(Service, { foreignKey: "service_id" });

User.hasMany(Review, { foreignKey: "reviewer_id", as: "givenReviews" });
User.hasMany(Review, { foreignKey: "reviewee_id", as: "receivedReviews" });
Review.belongsTo(User, { as: "reviewer", foreignKey: "reviewer_id" });
Review.belongsTo(User, { as: "reviewee", foreignKey: "reviewee_id" });

Service.hasMany(Review, { foreignKey: "service_id" });
Review.belongsTo(Service, { foreignKey: "service_id" });

module.exports = { sequelize, User, Service, Request, Message, Review };
