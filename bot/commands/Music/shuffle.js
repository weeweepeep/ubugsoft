const player = require("../../client/player")
const Discord = require('discord.js')

module.exports = {
    name: 'shuffle',
    description: "Shuffles the songs in queue",
    category: "Music",
    usage: "?shuffle",

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

        queue.shuffle()

        const shflEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`✅ - \`${queue.tracks.length}\` song(s) were shuffled in queue`)

        return message.reply({ embeds: [shflEmbed] })

    }
}