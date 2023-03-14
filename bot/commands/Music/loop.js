const player = require("../../client/player")
const Discord = require('discord.js')

module.exports = {
    name: 'loop',
    aliases: ["l"],
    description: "Loops the track or queue",
    category: "Music",
    usage: "?loop <off/track/queue/autoplay>",

    async execute(client, message, args) {

        const songTitle = args[0]

        const modes = ["off", "track", "queue", "autoplay"]

        const queue = player.getQueue(message.guildId)

        const novcEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`‼️ - You have to be in a Voice Channel to use this command!`)

        if (!message.member.voice.channel) return message.reply({ embeds: [novcEmbed] })


        const nosongEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`‼️ - No music is currently be played in this server!`)

        if (!queue?.playing) return message.reply({ embeds: [nosongEmbed] })

        const modeEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`‼️ - You can only choose among, \`off\`, \`track\`, \`queue\` & \`autoplay\``)

        const lEmbed1 = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`✅ - Loop mode is now disabled`)

        const lEmbed2 = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`✅ - Loop mode is now set to **TRACK**`)

        const lEmbed3 = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`✅ - Loop mode is now set to **QUEUE**`)

        const lEmbed4 = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`✅ - Loop mode is now set to **AUTOPLAY**`)

        if (!modes.includes(songTitle)) return message.reply({ embeds: [modeEmbed] })

        if (songTitle === "off") {

            queue.setRepeatMode(0)
            return message.reply({ embeds: [lEmbed1] })

        } else if (songTitle === "track") {

            queue.setRepeatMode(1)
            return message.reply({ embeds: [lEmbed2] })

        } else if (songTitle === "queue") {

            queue.setRepeatMode(2)
            return message.reply({ embeds: [lEmbed3] })

        } else if (songTitle === "autoplay") {

            queue.setRepeatMode(3)
            return message.reply({ embeds: [lEmbed4] })

        }

    }
}