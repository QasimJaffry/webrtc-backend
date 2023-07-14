const { connect } = require("../config/db.config");
const logger = require("../logger/api.logger");

class CallRepository {
  db = {};

  constructor() {
    this.db = connect();

    this.db.sequelize.sync({ force: true }).then(() => {
      console.log("Drop and re-sync db.");
    });
  }

  async addCallRecord(record) {
    let data = {};
    try {
      record.createdAt = new Date().toISOString();
      record.updatedAt = new Date().toISOString();
      data = await this.db.calls.create(record);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }
}

module.exports = new CallRepository();
