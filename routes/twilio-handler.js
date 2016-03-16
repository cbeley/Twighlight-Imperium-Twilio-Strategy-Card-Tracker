const xml = require('xml');
const gameDB = require('../lib/gameDB');

function createTwilioReply(messages){
   if(typeof messages === 'string') messages = [messages];

   let messagesXML = [];

   messages.forEach((message) => {
      messagesXML.push({
         Message: message,
      });
   });
   console.log({
      Response: messagesXML,
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
      const game = gameDB.addPhoneToGame(gameId, req.body.from, userName);

      if (!game) return createTwilioReply('Sorry, that game does not exist!');
      else return createTwilioReply(['Hi ' + userName + '!',
                                     'You have been added to the game!']);
   },

   done(req, command){
      const game = gameDB.getByPhone(req.body.from);

      if (!game) return createTwilioReply('You are not a part of a running game!');
      else if (!game.currentCard){
         return createTwilioReply(['No card is currently being played',
                                   'Play a card with "play [cardName]"']);
      }
      else {
         // TODO - Notify all players if everyone is done.
         game.playerStatus[req.body.from].done = true;
         return createTwilioReply('Finally!');
      }
   },

   start(req, command){
      const game = gameDB.getByPhone(req.body.from);

      if (!game) return createTwilioReply('You are not a part of a running game!');

      game.currentCard = command.arguments[0];
      game.currentPlayer = game.playerStatus[req.body.from].name;

      // TODO - Notify users that new game is starting.
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