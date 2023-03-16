const gif = require("image-cord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "blush",
    cooldown: 3,
    description: "be blushed",
    usage: "/blush",


    async execute(client, interaction, options) {
        const image = await gif.Blush()
        const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setImage(`${image}`)
        .setDescription(`${interaction.user} just blushed!`)

        interaction.reply({ embeds: [embed]})
    }
}