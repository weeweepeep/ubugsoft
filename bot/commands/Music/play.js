const { QueryType } = require("discord-player")
const player = require("../../client/player")
const Discord = require('discord.js')
const { Guild } = require('discord.js')
module.exports = {
    name: 'play',
    aliases: ['p'],
    description: "Plays a song",
    usage: "?p <song/vid-URL>",
    category: "Music",
    /**
     * 
     * @param {*} client 
     * @param {*} message 
     * @param {*} args 
     * @param {Guild} guild 
     * @returns 
     */
    async execute(client, message, args, guild) {

        const songTitle = args.join(" ")

        const nosongEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`‼️ - Please provide a song URL or song name!`)

        if (!songTitle) return message.reply({ embeds: [nosongEmbed] })

        const novcEmbed = new Discord.MessageEmbed()
            .setColor('#3d35cc')
            .setDescription(`‼️ - You have to be in a Voice Channel to use this command!`)

        if (!message.member.voice.channel) return message.reply({ embeds: [novcEmbed] })
        

        const searchResult = await player.search(songTitle, {
            requestedBy: message.author,
            searchEngine: QueryType.AUTO,
        })

        const queue = await player.createQueue(message.guild, { metadata: message.channel })

        if (!queue.connection) await queue.connect(message.member.voice.channel)
       

        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0])

        if (!queue.playing) await queue.play()

        const playEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`🎵 - Song added **${searchResult.tracks[0]}** - requested by **${message.author.tag}** - into **${message.member.voice.channel.name}**`)

        message.reply({ embeds: [playEmbed] })

    }
}