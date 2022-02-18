const autoBind = require("auto-bind");

module.exports = class Middleware {
  constructor() {
    autoBind(this);
  }

  failed(res, msg, statusCode = 500) {
    return res.status(statusCode).json({
      message: msg,
    });
  }
};
