module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define(
    "Request",
    {
      request_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      service_id: { type: DataTypes.INTEGER, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.STRING, defaultValue: "pending" },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "requests",
      timestamps: false,
    }
  );

  // Add associate function
  Request.associate = (models) => {
    Request.belongsTo(models.User, { foreignKey: "user_id" });
    Request.belongsTo(models.Service, { foreignKey: "service_id" });
  };

  return Request;
};
