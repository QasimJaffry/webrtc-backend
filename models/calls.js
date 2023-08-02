"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class calls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  calls.init(
    {
      userId: DataTypes.STRING,
      start_time: DataTypes.STRING,
      end_time: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      room_id: DataTypes.STRING,
      recipient: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "calls",
    }
  );
  return calls;
};
