module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define(
      "Message",
      {
        message_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        booking_id: { type: DataTypes.INTEGER, allowNull: true },
        sender_id: { type: DataTypes.INTEGER, allowNull: false },
        receiver_id: { type: DataTypes.INTEGER, allowNull: false },
        content: { type: DataTypes.TEXT, allowNull: false },
        sent_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
      },
      {
        tableName: "messages",
        timestamps: false,
      }
    );
  
    Message.associate = (models) => {
      Message.belongsTo(models.User, { foreignKey: "sender_id", as: "sender" });
      Message.belongsTo(models.User, { foreignKey: "receiver_id", as: "receiver" });
     
    };
  
    return Message;
  };
  