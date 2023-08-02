module.exports = (sequelize, DataTypes, Model) => {
  class Calls extends Model {}

  Calls.init(
    {
      call_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.STRING,
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      room_id: {
        type: DataTypes.STRING(50),
      },
      recipient: {
        type: DataTypes.STRING(50),
      },
    },
    {
      sequelize,
      modelName: "calls",
    }
  );

  return Calls;
};
