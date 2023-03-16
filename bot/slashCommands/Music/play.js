const { QueryType } = require("discord-player")
const player = require("../../client/player")
const Discord = require('discord.js')
const { Guild } = require('discord.js')
module.exports = {
    name: 'play',
    aliases: ['p'],
    description: "Plays a song",
    usage: "/play <song/vid-URL>",
    category: "Music",
    options: [
        {
            name: "song",
            description: "the name or URL of the song",
            type: 3,
            required: true,
        }
    ],
    /**
     * 
     * @param {*} client 
     * @param {*} interaction 
     * @param {*} args 
     * @param {Guild} guild 
     * @returns 
     */
    async execute(client, interaction, options, Discord) {
        
        const songTitle = interaction.options.getString("song")

        const nosongEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`‼️ - Please provide a song URL or song name!`);

        if (!songTitle) return interaction.reply({ embeds: [nosongEmbed] })

        const novcEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`‼️ - You have to be in a Voice Channel to use this command!`);

        if (!interaction.member.voice.channel) return interaction.reply({ embeds: [novcEmbed] })
        

        const searchResult = await player.search(songTitle, {
            requestedBy: interaction.author,
            searchEngine: QueryType.AUTO,
        })

        const queue = await player.createQueue(interaction.guild, { metadata: interaction.channel })

        if (!queue.connection) await queue.connect(interaction.member.voice.channel)
       

        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0])

        if (!queue.playing) await queue.play()

        const playEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`🎵 - Song added **${searchResult.tracks[0]}** - requested by **${interaction.user.tag}** - into **${interaction.member.voice.channel.name}**`);

        return interaction.reply({ embeds: [playEmbed] })

    }
}