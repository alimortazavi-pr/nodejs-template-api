const autoBind = require("auto-bind");

class validator {
  constructor() {
    autoBind(this);
  }
}

module.exports = validator;
