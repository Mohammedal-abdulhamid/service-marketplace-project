module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    role: DataTypes.STRING,
    phone: DataTypes.STRING,
    created_at: DataTypes.DATE
  }, {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  });

  User.associate = models => {
    User.hasMany(models.Service, { foreignKey: "provider_id" });
  };

  return User;
};
