const SnakeGame = require('snakecord');
const snakeGame = new SnakeGame({

   title: 'Snake Game',

   color: "GREEN",

   timestamp: false,

   gameOverTitle: "Game Over"

});
module.exports = {
name: "snake",
aliases: ["snakegame"],
category: "Fun",
description: "play a snake game",
usage: "?snake",
async execute(client, message, args) {
return snakeGame.newGame(message);
}
}