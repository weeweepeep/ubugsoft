require('dotenv').config()
const Levels = require("discord-xp")
Levels.setURL(process.env.MONGO_DB)
const canvacord = require("canvacord")
const { MessageAttachment } = require('discord.js')

module.exports = {
    name: 'rank',
    description: "Sends member's rank card",
    usage: "?rank",
    cooldown: 5,

    async execute(client, interaction) {


            const target = interaction.user

            const user = await Levels.fetch(target.id, interaction.guild.id, true)

            if (!user) return interaction.reply("Seems like the user has not gained enough XP!")

            const neededXp = Levels.xpFor(parseInt(user.level) + 1)

            const rank = new canvacord.Rank()
                .setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png' }))
                .setCurrentXP(user.xp)
                .setLevel(user.level)
                .setBackground("IMAGE", 'https://www.pixelstalk.net/wp-content/uploads/2016/08/HD-1920x1080-Anime-Background.jpg')
                .setRequiredXP(neededXp)
                .setStatus(interaction.member.presence.status)
                .setProgressBar("BLUE", "COLOR")
                .setOverlay("WHITE", 0.01, true)
                .setUsername(target.username)
                .setDiscriminator(target.discriminator)

            rank.build().then(data => {

                const attachment = new MessageAttachment(data, 'rankcard.png')
                interaction.reply({ files: [attachment] })

            })

        }

    }
