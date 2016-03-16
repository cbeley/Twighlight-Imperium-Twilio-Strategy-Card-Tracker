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
      joinNumber: '1234',
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