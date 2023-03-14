const player = require("../../client/player")
const Discord = require('discord.js')

module.exports = {
    name: 'volume',
    aliases: ["vol"],
    description: "Changes or checks the volume of the current song",
    usage: "?volume <0-100>",
    category: "Music",

    async execute(client, message, args) {

        const volumePercentage = args[0]
        const queue = player.getQueue(message.guildId)

        const novcEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`‼️ - You have to be in a Voice Channel to use this command!`)

        if (!message.member.voice.channel) return message.reply({ embeds: [novcEmbed] })

        const nosongEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`‼️ - No music is currently be played in this server!`)

        if (!queue?.playing) return message.reply({ embeds: [nosongEmbed] })

        const smvcEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`‼️ - Music is currently being played in **${message.guild.me.voice.channel.name}**. You've to be in the same Voice Channel to execute this command!`)

        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ embeds: [smvcEmbed] })

        const volEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`🔊 - The current volume is \`${queue.volume}%\``)

        if (!volumePercentage) return message.reply({ embeds: [volEmbed] })

        const volerrEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`‼️ - The volume must be betweeen \`1\` and \`100\`!`)

        if (volumePercentage < 0 || volumePercentage > 100) return message.reply({ embeds: [volerrEmbed] })

        queue.setVolume(volumePercentage)

        const volsetEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`✅ - Volume has been set to \`${volumePercentage}%\``)

        return message.reply({ embeds: [volsetEmbed] })

    }
}