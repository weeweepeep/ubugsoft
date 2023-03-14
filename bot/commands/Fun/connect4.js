const { ConnectFour } = require('djs-games')

module.exports = {
    name : 'connect4',
    cooldown: 4,
    description : 'connect4 game',
    usage: "?connect4 <user to challenge>",
    category: "Fun",

execute(client, message, args) {



const game = new ConnectFour({
  message: message,
  player1: '🔴',
  player2: '🟡',
})
game.start()

   }

}