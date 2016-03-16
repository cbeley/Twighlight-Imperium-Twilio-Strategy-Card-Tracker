const express = require('express');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');

module.exports = function () {
  const app = express();

  app.set("port", process.env.PORT || 9000);

  // Middleware
  if (process.env.ENVIRONMENT === "development"){
    app.use(errorhandler());
  }

  // create our routes and return the app so that the app
  // can be started in multiple ways.
  require("./routes")(app);

  return app;
};