const gameDB = require('../lib/gameDB');

module.exports = (req, res) => {
   // If the gameID does not exist yet, we make it automatically so users
   // can just go to a URL and auto create a new game.  This is more just
   // because I don't want to make UI for creation of games yet.
   let game = gameDB.get(req.params.gameId);
   if (!game) gameDB.create(req.params.gameId);

   const inlineServerData = JSON.stringify({
      gameId: req.params.gameId,
   });

   res.render('game', {serverData: inlineServerData});
};