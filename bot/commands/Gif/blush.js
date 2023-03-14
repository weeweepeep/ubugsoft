const gif = require("image-cord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "blush",
    cooldown: 3,
    description: "be blushed",
    usage: "?blush",

    async execute(client, message, args) {
        const target = message.mentions.users.first()
        const image = await gif.Blush()
        const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setImage(`${image}`)
        .setDescription(`${message.author} just blushed!`)

        message.reply({ embeds: [embed]})
    }
}