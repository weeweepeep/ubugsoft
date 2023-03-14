const gif = require("image-cord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "bite",
    cooldown: 3,
    description: "bite someone",
    usage: "?bite @<user>",

    async execute(client, message, args) {
        const target = message.mentions.users.first()
        if(!target) return message.reply("**please provide a user to bite**")
        const image = await gif.Bite()
        const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setImage(`${image}`)
        .setDescription(`${message.author} just bit ${target}!`)

        message.reply({ embeds: [embed]})
    }
}