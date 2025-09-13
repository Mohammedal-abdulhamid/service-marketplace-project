module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      booking_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reviewer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reviewee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "reviews",
      timestamps: true,       
      createdAt: "created_at", 
      updatedAt: false,        
    }
  );

  Review.associate = (models) => {
    Review.belongsTo(models.User, { as: "reviewer", foreignKey: "reviewer_id" });
    Review.belongsTo(models.User, { as: "reviewee", foreignKey: "reviewee_id" });
    Review.belongsTo(models.Service, { foreignKey: "service_id" });
  };

  return Review;
};
