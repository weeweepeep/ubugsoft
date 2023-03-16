const gif = require("image-cord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "cry",
    cooldown: 3,
    description: "cry someone",
    usage: "/cry @<user>",

    async execute(client, interaction, options) {

        const image = await gif.Cry()
        const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setImage(`${image}`)
        .setDescription(`Someone just made ${interaction.user} cry!`)

        interaction.reply({ embeds: [embed]})
    }
}