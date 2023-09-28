require('dotenv').config()
const Levels = require("discord-xp")
const { interactionEmbed } = require('discord.js')
Levels.setURL(process.env.MONGO_DB)

module.exports = {
    name: 'leaderboard',
    aliases: ["lb"],
    description: "Sends ranking leaderboard",
    category: "Music",
    usage: ".lb",
    cooldown: 5,

    async execute(client, interaction, options) {


            const rawLeaderboard = await Levels.fetchLeaderboard(interaction.guild.id, 10)

            if (rawLeaderboard.length < 1) return interaction.reply("Nobody's in the leaderboard yet!")

            const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true)

            const lb = leaderboard.map(e => `\`${e.position}\` | ${e.username}#${e.discriminator} | **${e.level}** Level | **${e.xp.toLocaleString()}** XP`).join("\n")

            const lbEmbed = new interactionEmbed()
                .setColor("GREEN")
                .setTitle(`Ranking Leaderboard of ${interaction.guild.name}`)
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setDescription(`${lb}`)
                .setTimestamp()

            interaction.reply({ embeds: [lbEmbed] })

        }

}