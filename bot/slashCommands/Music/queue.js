const player = require("../../client/player")
const Discord = require('discord.js')

module.exports = {
    name: 'queue',
    description: "Displays all the songs in queue",
    category: "Music",
    usage: "/queue",

    async execute(client, interaction, options) {

        const queue = player.getQueue(interaction.guildId)

        const novcEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`‼️ - You have to be in a Voice Channel to use this command!`)

        if (!interaction.member.voice.channel) return interaction.reply({ embeds: [novcEmbed] })



        const nosongEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`‼️ - No music is currently be played in this server!`)

        if (!queue?.playing) return interaction.reply({ embeds: [nosongEmbed] })

        const currentTrack = queue.current

        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
            return `\`${i + 1}.\` - [**${m.title}**](${m.url}) - \`${m.requestedBy.tag}\``
        })

        const queueEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setTitle(`**🎶 Song queue - ${interaction.guild.name} 🎶**`)
            .addFields([
                { name: "Current:", value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - \`${currentTrack.requestedBy.tag}\`\n\n` },
                {
                    name: "Queue:", value: `${tracks.join("\n")}${queue.tracks.length > tracks.length ? `\n...${queue.tracks.length - tracks.length === 1 ? `${queue.tracks.length - tracks.length} more track` : `${queue.tracks.length - tracks.length} more tracks`}` : ""}`
                }
            ])
            .setThumbnail(currentTrack.thumbnail)
            .setTimestamp()

        return interaction.reply({ embeds: [queueEmbed] })

    }
}