const layout = require("config/layout");
const database = require("config/database");
const jwt = require("config/jwt");

module.exports = {
  port: process.env.APPLICATION_PORT,
  url: process.env.APPLICATION_URL,
  url_frontend: process.env.APPLICATION_URL_FRONTEND,
  database,
  layout,
  jwt,
};
