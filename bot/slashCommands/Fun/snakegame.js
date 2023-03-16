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
usage: "/snake",
description: "play a snake game",
async execute(client, interaction, options) {
return snakeGame.newGame(interaction);
}
}