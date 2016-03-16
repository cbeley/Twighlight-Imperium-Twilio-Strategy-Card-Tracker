const config = require('../config.json');

const games = {};
const phoneToGame = {};

exports.get = (gameId) => {
   return games[gameId];
};

exports.getByPhone = (phone) => {
   return games[phoneToGame[phone]];
};

exports.create = (gameId) => {
   if (games[gameId]) return null;

   games[gameId] = {
      // In the future, it'd be neat to have a differnt number for each game.
      joinNumber: config.twilio.friendlyPhone,
      gameId: gameId,
      playerStatus: {},
      currentCard: null,
      currentPlayer: null,
   };

   return games[gameId];
};

exports.addPhoneToGame = (gameId, number, name) => {
   const game = games[gameId];
   if (!game) return null;

   game.playerStatus[number] = {
      number: number,
      name: name,
      done: false,
   };

   phoneToGame[number] = gameId;

   return game;
};

exports.isEveryoneDone = (gameId) => {
   const game = games[gameId];
   if (!game) return false;

   return Object.keys(game.playerStatus).every(playerNum => game.playerStatus[playerNum].done);
}

exports.resetGame = (gameId) => {
      const game = games[gameId];
      if (!game) return null;

      Object.keys(game.playerStatus).forEach(playerNum => { game.playerStatus[playerNum].done = false; });
      game.currentCard = null;
      game.currentPlayer = null;
}