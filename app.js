const express = require('express');
const exphbs = require('express-handlebars');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');

const gameDB = require('./lib/gameDB');
const config = require('./config.json');

module.exports = function () {
  const app = express();

  app.set("port", config.port || 9000);

  // Set up Handlebars for server-side templates
  app.engine('handlebars', exphbs());
  app.set('view engine', 'handlebars');

  // Middleware
  if (process.env.ENVIRONMENT === "development"){
    app.use(errorhandler());
  }

  // create our routes and return the app so that the app
  // can be started in multiple ways.
  require("./routes")(app);

  // There currently isn't a way to create a new game via the UI
  // so we make a demo game.
  gameDB.create('newGame');

  return app;
};