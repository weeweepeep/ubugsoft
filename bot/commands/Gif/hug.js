const gif = require("image-cord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "hug",
    cooldown: 3,
    description: "hug someone",
    usage: "?hug @<user>",

    async execute(client, message, args) {
        const target = message.mentions.users.first()
        if(!target) return message.reply("**please provide a user to hug!**")
        const image = await gif.Hug()
        const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setImage(`${image}`)
        .setDescription(`${message.author} just hugged ${target}!`)

        message.reply({ embeds: [embed]})
    }
}