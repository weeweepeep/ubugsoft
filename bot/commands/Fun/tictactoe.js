module.exports= {
    name: "tictactoe",
    aliases: ["ttt"],
    description: "sends a ttt to play with other user",
    usage: "?ttt @<user>",
    category: "Fun",
    async execute(client, message, args) {
        const simplydjs = require("simply-djs")
        simplydjs.tictactoe(message)
    }

}