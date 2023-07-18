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

<<<<<<< HEAD
<<<<<<< HEAD
  const sequelize = new Sequelize("meetgreetdb", "postgres", "Test123", {
=======
  const sequelize = new Sequelize(database, username, password, {
>>>>>>> c065e56ddce331bcc303857c10ce6aaf1da525ee
=======
  const sequelize = new Sequelize(database, "postgres", password, {
>>>>>>> 4f0f31733807dce6b8839b40831107b99789cbd7
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
