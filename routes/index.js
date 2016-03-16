const bodyParser = require('body-parser');
const express = require('express');
const path = require('path')

const game = require('./game');
const gameUI = require('./game-ui');
const twilioHandler = require('./twilio-handler');

module.exports = function(app){
   // Allow the user to retrieve or start a new game via their browser.
   app.get('/game/:gameId', gameUI);
   
   // Retrieve an existing game.
   app.get('/game', game.get);

   // Create a new game.
   app.post('/game', bodyParser.json(), game.post);

   // Handle callbacks from Twilio.
   app.post('/twilio-handler', bodyParser.urlencoded({ extended: false }), twilioHandler);

   // Just hosting all of our static assets (JS, CSS, images, etc.).
   app.use('/static', express.static(path.join(__dirname, '../client/static')));

};