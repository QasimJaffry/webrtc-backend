module.exports = (sequelize, DataTypes, Model) => {
  class Users extends Model {}

  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );

  return Users;
};
