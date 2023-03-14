const gif = require("image-cord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "lick",
    cooldown: 3,
    description: "lick someone",
    usage: "?lick @<user>",

    async execute(client, message, args) {
        const target = message.mentions.users.first()
        if(!target) return message.reply("**please provide a user to lick**")
        const image = await gif.Lick()
        const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setImage(`${image}`)
        .setDescription(`${message.author} just licked ${target}!`)

        message.reply({ embeds: [embed]})
    }
}