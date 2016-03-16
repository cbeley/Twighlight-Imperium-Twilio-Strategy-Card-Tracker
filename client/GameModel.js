const Backbone = require('backbone');

module.exports = Backbone.Model.extend({
   url: '/game',

   defaults: {
      gameId: null,
      currentCard: null,
      currentPlayer: null,
      playerStatus: null,
      joinNumber: null,
   },
});