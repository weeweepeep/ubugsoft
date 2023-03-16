const player = require("../../client/player")
const Discord = require('discord.js')

module.exports = {
    name: 'pause',
    description: "Pauses a song",
    category: "Music",
    usage: "/pause",

    async execute(client, interaction, args) {

        const queue = player.getQueue(interaction.guildId)

        const novcEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`‼️ - You have to be in a Voice Channel to use this command!`)

        if (!interaction.member.voice.channel) return Discord.interaction.reply({ embeds: [novcEmbed] })

        const nosongEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`‼️ - No music is currently be played in this server!`)

        if (!queue?.playing) return interaction.reply({ embeds: [nosongEmbed] })

        const smvcEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`‼️ - Music is currently being played in **${interaction.guild.me.voice.channel.name}**. You've to be in the same Voice Channel to execute this command!`)

        if (interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({ embeds: [smvcEmbed] })

        queue.setPaused(true)

        const pauseEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`✅ - Song **${queue.current.title}** has been paused`)

        return Interaction.reply({ embeds: [pauseEmbed] })

    }
}