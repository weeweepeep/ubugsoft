const gif = require("image-cord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "kiss",
    cooldown: 3,
    description: "kiss someone",
    usage: "?kiss @<user>",

    async execute(client, message, args) {
        const target = message.mentions.users.first()
        if(!target) return message.reply("**please provide a user to kiss**")
        const image = await gif.Kiss()
        const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setImage(`${image}`)
        .setDescription(`${message.author} just kissed ${target}!`)

        message.reply({ embeds: [embed]})
    }
}