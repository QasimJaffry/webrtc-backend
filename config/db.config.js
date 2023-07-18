require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");
const logger = require("../logger/api.logger");

const connect = () => {
  const hostName = process.env.HOST;
  const username = process.env.USER;
  const password = process.env.PASSWORD;
  const database = process.env.DB;
  const dialect = process.env.DIALECT;
  const port = process.env.PORT;
  const sequelize = new Sequelize(database, username, password, {
    host: hostName,
    dialect: dialect,
    operatorsAliases: false,
    port: port,
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000,
    },
  });

  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.users = require("../model/user.model")(sequelize, DataTypes, Model);

  return db;
};

module.exports = {
  connect,
};
