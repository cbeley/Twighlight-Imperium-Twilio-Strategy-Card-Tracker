const GameModel = require('./GameModel');
const GameView = require('./GameView');


let model = new GameModel();
let view = new GameView({model: model});
window.document.body.appendChild(view.el);

window.setInterval(() => {
   model.fetch({
      data: {
         gameId: 'newGame',
      },

      error(){
         console.log('something went wrong fetching the game model!');
      },
   });
}, 1000);