module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define("Service", {
    service_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    provider_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),  
    role: DataTypes.STRING,           
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    tableName: "services",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });

  Service.associate = models => {
    Service.belongsTo(models.User, { foreignKey: "provider_id" });
  };

  return Service;
};
