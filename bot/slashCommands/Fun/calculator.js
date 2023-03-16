module.exports = {
    name: "calculator",
    aliases: ["cal"],
    cooldown: 15,
    category: "Fun",
    description: "a calculator",
    usage: "/calculator",
    async execute(client, interaction, options) {
        const simplydjs = require("simply-djs")
        simplydjs.calculator(interaction,{
            embedColor: "BLUE"
        })
    }
}