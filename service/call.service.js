const callRepository = require("../repository/call.repository");

class CallService {
  constructor() {}

  async addCallRecord(record) {
    return await callRepository.addCallRecord(record);
  }
}

module.exports = new CallService();
