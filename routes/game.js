const gameDB = require('../lib/gameDB');
const utilities = require('../lib/utilities');

module.exports = {
   post(req, res) {
      const gameId = req.body.gameId;

      if (!gameId) return utilities.sendError(res, 'Missing gameId');

      const game = gameDB.create(gameId)

      if (!game) return utilities.sendError(res, 'gameId not available');

      res.send({
         success: true
      });
   },

   get(req, res) {
      let game;

      if (req.query.gameId) game = gameDB.get(req.query.gameId);
      else if (req.query.phone) game = gameDB.getByPhone(req.query.phone);

      if (!game) return utilities.sendError(res, 'Invalid gameId or phone');

      res.send(game);
   },
};