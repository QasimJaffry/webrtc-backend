const { connect } = require("../config/db.config");
const logger = require("../logger/api.logger");

class CallRepository {
  db = {};

  constructor() {
    this.db = connect();
  }

  async addUserCallRecord(callRecord) {
    let data = {};
    try {
      callRecord.createdAt = new Date().toISOString();
      callRecord.updatedAt = new Date().toISOString();
      data = await this.db.calls.create(callRecord);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async getCallRecordsById(userId) {
    let data = {};
    try {
      data = await this.db.calls.findOne({
        where: { userId: userId },
      });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }
}

module.exports = new CallRepository();
