module.exports = (sequelize, DataTypes, Model) => {
  class Calls extends Model {}

  Calls.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      callTime: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
      },
    },
    {
      sequelize,
      modelName: "calls",
    }
  );

  return Calls;
};
