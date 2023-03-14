const player = require("../../client/player")
const Discord = require('discord.js')

module.exports = {
    name: 'stop',
    aliases: ["disconnect"],
    description: "Stops a song & disconnects",
    usage: '?stop',
    cooldown: 5,
    category: "Music",

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

        queue.stop()

        const stopEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`✅ - Music stopped into this server`)

        return message.reply({ embeds: [stopEmbed] })

    }
}