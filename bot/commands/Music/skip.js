const player = require("../../client/player")
const Discord = require('discord.js')

module.exports = {
    name: 'skip',
    description: "Skips the current song",
    cooldown: 10,
    category: "Music",
    usage: "?skip",

    async execute(client, message, args) {

        const queue = player.getQueue(message.guildId)

        const novcEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`‼️ - You have to be in a Voice Channel to use this command!`)

        if (!message.member.voice.channel) return message.reply({ embeds: [novcEmbed] })


        const nosongEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`‼️ - No music is currently be played in this server!`)

        if (!queue?.playing) return message.reply({ embeds: [nosongEmbed] })

        await queue.skip()

        const skipEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`✅ - The current song has been skipped`)

        return message.reply({ embeds: [skipEmbed] })

    }
}