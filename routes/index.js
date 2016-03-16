const bodyParser = require('body-parser');

const game = require('./game');
const twilioHandler = require('./twilio-handler');

module.exports = function(app){
   // Retrieve an existing game.
   app.get('/game', game.get);

   // Create a new game.
   app.post('/game', bodyParser.json(), game.post);

   // Handle callbacks from Twilio
   app.post('/twilio-handler', bodyParser.urlencoded({ extended: false }), twilioHandler);
};