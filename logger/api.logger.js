class APILogger {
  info(message) {
    console.log(message);
  }

  info(message, data) {
    console.log(
      `${message}   ${undefined != data ? JSON.stringify(data) : ""}`
    );
  }

  error(message) {
    console.error(message);
  }
}

module.exports = new APILogger();
