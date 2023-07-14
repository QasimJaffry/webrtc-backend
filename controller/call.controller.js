const callService = require("../service/call.service");
const logger = require("../logger/api.logger");

class CallController {
  async addCallRecord(record) {
    logger.info("Controller: add CALL", record);
    return await callService.addCallRecord(record);
  }
}
module.exports = new CallController();
