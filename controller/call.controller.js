const callService = require("../service/call.service");
const logger = require("../logger/api.logger");

class CallController {
  async addUserCallRecord(callRecord) {
    logger.info("Controller: callRecord", callRecord);
    return await callService.addUserCallRecord(callRecord);
  }

  async getCallRecordsById(userId) {
    logger.info("Controller: getCallRecordsById", userId);
    return await callService.getCallRecordsById(userId);
  }
}
module.exports = new CallController();
