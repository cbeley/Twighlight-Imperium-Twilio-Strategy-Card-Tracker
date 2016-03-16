const xml = require('xml');
const debug = require('debug')('TIServer');

const gameDB = require('../lib/gameDB');
const messageUtils = require('../lib/messageUtils');

function createTwilioReply(messages){
   if(typeof messages === 'string') messages = [messages];

   let messagesXML = [];

   messages.forEach((message) => {
      messagesXML.push({
         Message: message,
      });
   });

   return xml({
      Response: messagesXML,
   }, { declaration: true });
};

function parseCommand(cmdString){
   if (!cmdString) return { action: null, arguments: [] };

   const cmd = cmdString.split(' ');
   return {
      action: cmd[0],
      arguments: cmd.splice(1)
   }
}

const actions = {
   join(req, command){
      const gameId = command.arguments[0]; 
      const userName = command.arguments.slice(1).join(' ');
      const game = gameDB.addPhoneToGame(gameId, req.body.From, userName);

      if (!game) return createTwilioReply('Sorry, that game does not exist!');
      else return createTwilioReply(['Hi ' + userName + '!',
                                     'You have been added to the game!']);
   },

   done(req, command){
      const game = gameDB.getByPhone(req.body.From);

      if (!game) return createTwilioReply('You are not a part of a running game!');
      else if (!game.currentCard){
         return createTwilioReply(['No card is currently being played',
                                   'Play a card with "play [cardName]"']);
      }
      else {
         game.playerStatus[req.body.From].done = true

         if (gameDB.isEveryoneDone(game.gameId)){
            // This doesn't really need to block responding to Twilio.
            const msg = 'Everyone has finished ' + game.currentCard + '! ' + 
                  'You can blame ' + game.playerStatus[req.body.From].name + ' for being slow.';
            messageUtils.sendToAllPlayers(game.gameId, msg, (error) => {
               if (error){
                  debug('[Error] Something went wrong while telling everyone that everyone is done.');
                  debug(error.message);
               }
            });

            gameDB.resetGame(game.gameId);
         }
         
         return createTwilioReply('Finally!');
      }
   },

   start(req, command){
      const game = gameDB.getByPhone(req.body.From);

      if (!game) return createTwilioReply('You are not a part of a running game!');

      game.currentCard = command.arguments[0];
      game.currentPlayer = game.playerStatus[req.body.From].name;

      // This doesn't really need to block responding to Twilio.
      messageUtils.sendToAllPlayers(game.gameId, game.currentPlayer + ' has started ' + game.currentCard, (error) => {
         if (error){
            debug('[Error] Something went wrong while sending a strategy card start message to everyone.');
            debug(error.message);
         }
      });
      
      return createTwilioReply('Cool, I\'ll notify all the other players!');
   },
};

module.exports = (req, res) => {
   const command = parseCommand(req.body.Body);
   const action = actions[command.action];

   res.set('Content-Type', 'text/xml');

   if (!action){
      return res.send(createTwilioReply(['I\'m sorry.  I don\'t know what you want. :(',
                                         'Maybe you got the wrong number and have no idea what' + 
                                         'Twlight Imperium is.  If so, text STOP and we will never' + 
                                         'bother you again!']));
   }

   res.send(action(req, command));
};