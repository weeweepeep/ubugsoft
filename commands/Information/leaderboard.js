require('dotenv').config()
const Levels = require("discord-xp")
const { MessageEmbed } = require('discord.js')
Levels.setURL(process.env.MONGO_DB)

module.exports = {
    name: 'leaderboard',
    aliases: ["lb"],
    description: "Sends ranking leaderboard",
    category: "Music",
    usage: ".lb",
    cooldown: 5,

    async execute(client, message, args) {


            const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10)

            if (rawLeaderboard.length < 1) return message.reply("Nobody's in the leaderboard yet!")

            const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true)

            const lb = leaderboard.map(e => `\`${e.position}\` | ${e.username}#${e.discriminator} | **${e.level}** Level | **${e.xp.toLocaleString()}** XP`).join("\n")

            const lbEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setTitle(`Ranking Leaderboard of ${message.guild.name}`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setDescription(`${lb}`)
                .setTimestamp()

            message.reply({ embeds: [lbEmbed] })

        }

}