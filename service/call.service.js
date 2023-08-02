const callRepository = require("../repository/call.repository");

class CallService {
  constructor() {}

  async addUserCallRecord(callRecord) {
    return await callRepository.addUserCallRecord(callRecord);
  }

  async getCallRecordsById(userId) {
    return await callRepository.getCallRecordsById(userId);
  }
}

module.exports = new CallService();
