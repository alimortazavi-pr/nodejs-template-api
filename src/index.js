const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

class Application {
  constructor() {
    this.server();
    this.db();
    this.config();
    this.routes();
  }

  server() {
    const server = http.createServer(app);
    server.listen(process.env.PORT || config.port, () => {
      console.log(`
                Application is running on port ${config.port}
                Application url (API) : ${config.url}
                Application url (Front-End) : ${config.url_frontend}
            `);
    });
  }

  db() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.database.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  config() {
    app.use(express.static(config.layout.public_dir));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  }

  routes() {
    app.use(cors(), require("src/routers"));
  }
}

module.exports = Application;
