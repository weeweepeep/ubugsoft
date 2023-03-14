module.exports = {
    name: "calculator",
    aliases: ["cal"],
    cooldown: 15,
    category: "Fun",
    description: "a calculator",
    usage: "?cal",
    async execute(client,message,args) {
        const simplydjs = require("simply-djs")
        simplydjs.calculator(message,{
            embedColor: "BLUE"
        })
    }
}