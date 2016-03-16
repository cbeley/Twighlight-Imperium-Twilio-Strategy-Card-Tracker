const Backbone = require('backbone');

module.exports = Backbone.View.extend({
   initialize(){
      this.listenTo(this.model, 'change', this.render);
   },

   render(){
      this.el.innerHTML = require('./templates/gameView.hbs')({
         gameId: this.model.get('gameId'),
         currentCard: this.model.get('currentCard'),
         currentPlayer: this.model.get('currentPlayer'),
         players: this.model.get('playerStatus'),
         joinNumber: this.model.get('joinNumber'),
      });
   },
});