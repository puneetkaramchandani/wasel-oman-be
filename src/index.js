const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes");
const express = require("express");
const { jwt } = require("./utils");
const connectToDatabase = require("./database");
const { sendResponse } = require("./utils");
const {
  STATUS_CODES: { UNAUTHORIZED },
} = require("./constants");
const methodOverride = require('method-override');
const mongoSanitizer = require('express-mongo-sanitize');

function run() {
  dotenv.config();
  connectToDatabase();
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride("_method"));
  app.use(mongoSanitizer());
  app.use(cors());
  app.use(jwt());
  app.use(routes);

  app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      sendResponse(res, UNAUTHORIZED, { msg: "Login to continue" }, true);
    } else {
      sendResponse(res, err, { msg: err.message }, true);
    }
  });

  // Start the server to listen
  const port =
    process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
  app.listen(port, () => {
    console.log(`Wasel backend server started listening on port : ${port}`);
  });
  // Start the server to listen
}

run();
