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

  console.log(username, password, database, dialect);

  // const sequelize = new Sequelize({
  //   host: hostName,
  //   database: database,
  //   username: userName,
  //   password: password,
  //   dialect: dialect,
  //   operatorsAliases: false,
  //   port: port,
  //   pool: {
  //     max: 10,
  //     min: 0,
  //     acquire: 20000,
  //     idle: 5000,
  //   },
  // });

  const sequelize = new Sequelize(database, "postgres", password, {
    host: hostName,
    dialect: dialect,
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
  db.calls = require("../model/call.model")(sequelize, DataTypes, Model);

  // 1 to Many relationship

  db.users.hasMany(db.calls, {
    foreignKey: "userId",
    as: "calls",
  });

  db.calls.belongsTo(db.users, {
    foreignKey: "userId",
    as: "users",
  });

  return db;
};

module.exports = {
  connect,
};
