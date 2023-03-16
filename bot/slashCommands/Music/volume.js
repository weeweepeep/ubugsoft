const player = require("../../client/player")
const Discord = require('discord.js')

module.exports = {
    name: 'volume',
    aliases: ["vol"],
    description: "Changes or checks the volume of the current song",
    usage: "/volume <0-100>",
    category: "Music",
    options: [
        {
            name: "volume",
            description: "the volume of the bot",
            type: 4,
            required: false,
        }
    ],

    async execute(client, interaction, options) {

        const volumePercentage = interaction.options.getInteger("volume")
        const queue = player.getQueue(interaction.guildId)

        const novcEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`‼️ - You have to be in a Voice Channel to use this command!`)

        if (!interaction.member.voice.channel) return interaction.reply({ embeds: [novcEmbed] })

        const nosongEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`‼️ - No music is currently be played in this server!`)

        if (!queue?.playing) return interaction.reply({ embeds: [nosongEmbed] })

        const smvcEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`‼️ - Music is currently being played in **${interaction.guild.me.voice.channel.name}**. You've to be in the same Voice Channel to execute this command!`)

        if (interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({ embeds: [smvcEmbed] })

        const volEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`🔊 - The current volume is \`${queue.volume}%\``)

        if (!volumePercentage) return interaction.reply({ embeds: [volEmbed] })

        const volerrEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`‼️ - The volume must be betweeen \`1\` and \`100\`!`)

        if (volumePercentage < 0 || volumePercentage > 100) return interaction.reply({ embeds: [volerrEmbed] })

        queue.setVolume(volumePercentage)

        const volsetEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`✅ - Volume has been set to \`${volumePercentage}%\``)

        return interaction.reply({ embeds: [volsetEmbed] })

    }
}