const twilio = require('twilio');
const async = require('async');

const gameDB = require('./gameDB');
const config = require('../config.json');

const twilioClient = twilio(config.twilio.accountSid, config.twilio.authToken);

exports.sendToAllPlayers = (gameId, message, cb) => {
   const game = gameDB.get(gameId);
   if (!game) cb(new Error('Invalid gameId'));

   async.each(Object.keys(game.playerStatus), (playerPhone) => {
      twilioClient.messages.create({
         body: message,
         to: playerPhone,
         from: config.twilio.phoneNumber,
      }, cb);
   }, cb);
};
