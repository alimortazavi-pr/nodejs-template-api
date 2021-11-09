const autoBind = require("auto-bind");
const { validationResult } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");

class controller {
  constructor() {
    autoBind(this);
  }

  validationData(req, res) {
    const errors = validationResult(req);
    const easyError = errors.array().map((err) => err.msg);
    if (!errors.isEmpty()) {
      if (req.file && fs.existsSync(req.file.path))
        fs.unlinkSync(req.file.path);
      if (req.files) {
        if (req.files.length !== 0) {
          req.files.forEach((file) => {
            if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
          });
        }
      }
      this.failed(res, req, easyError, 403);
      return false;
    }
    return true;
  }

  failed(res, req, msg, statusCode = 500) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    if (req.files) {
      if (req.files.length !== 0) {
        req.files.forEach((file) => {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        });
      }
    }
    return res.status(statusCode).json({
      message: msg,
    });
  }

  isValidMongoId(req, res, id) {
    if (!ObjectId.isValid(id)) {
      this.failed(res, req, "MongoId is not valid");
      return false;
    } else {
      return true;
    }
  }
}

module.exports = controller;
