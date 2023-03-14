const gif = require("image-cord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "slap",
    cooldown: 3,
    description: "slap someone",
    usage: "?slap @<user>",

    async execute(client, message, args) {
        const target = message.mentions.users.first()
        if(!target) return message.reply("**please provide a user to slap**")
        const image = await gif.Slap()
        const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setImage(`${image}`)
        .setDescription(`${message.author} just slapped ${target}!`)

        message.reply({ embeds: [embed]})
    }
}