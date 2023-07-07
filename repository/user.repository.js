const { connect } = require("../config/db.config");
const logger = require("../logger/api.logger");

class UserRepository {
  db = {};

  constructor() {
    this.db = connect();

    this.db.sequelize.sync({ force: true }).then(() => {
      console.log("Drop and re-sync db.");
    });

    console.log(this.db, "this.db");
  }

  async getUsers() {
    try {
      const users = await this.db.users.findAll();
      console.log("users:::", users);
      return users;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async createUser(user) {
    let data = {};
    try {
      user.createdate = new Date().toISOString();
      data = await this.db.users.create(user);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async updateUser(user) {
    let data = {};
    try {
      user.updateddate = new Date().toISOString();
      data = await this.db.users.update(
        { ...user },
        {
          where: {
            id: user.id,
          },
        }
      );
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async getUserById(userId) {
    let data = {};
    try {
      await this.db.users.findByPk(userId);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async deleteUser(userId) {
    let data = {};
    try {
      data = await this.db.users.destroy({
        where: {
          id: userId,
        },
      });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}

module.exports = new UserRepository();
