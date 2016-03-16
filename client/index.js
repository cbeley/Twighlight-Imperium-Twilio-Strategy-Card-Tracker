const GameModel = require('./GameModel');
const GameView = require('./GameView');

/**
 * Retrieve the inlined server data, unescape HTML entities, and parse as JSON.
 */
function retrieveServerData(){
   const inlineData = document.querySelector('#inline-data').textContent;
   const parsingElement = document.createElement('textarea');
   parsingElement.innerHTML = inlineData;
   
   try {
      return JSON.parse(parsingElement.value);
   } catch (ex){
      console.log('Something went wrong parsing server data...');
      return {};
   }
}

const model = new GameModel();
const view = new GameView({model: model});
const gameId = retrieveServerData().gameId;

document.body.appendChild(view.el);

window.setInterval(() => {
   model.fetch({
      data: {
         gameId: gameId,
      },

      error(){
         console.log('something went wrong fetching the game model!');
      },
   });
}, 1000);