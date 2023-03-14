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

    async execute(client, message, cmd, args, Discord) {


            const target = message.author

            const user = await Levels.fetch(target.id, message.guild.id, true)

            if (!user) return message.reply("Seems like the user has not gained enough XP!")

            const neededXp = Levels.xpFor(parseInt(user.level) + 1)

            const rank = new canvacord.Rank()
                .setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png' }))
                .setCurrentXP(user.xp)
                .setLevel(user.level)
                .setBackground("IMAGE", 'https://www.pixelstalk.net/wp-content/uploads/2016/08/HD-1920x1080-Anime-Background.jpg')
                .setRequiredXP(neededXp)
                .setStatus(message.member.presence.status)
                .setProgressBar("BLUE", "COLOR")
                .setOverlay("WHITE", 0.01, true)
                .setUsername(target.username)
                .setDiscriminator(target.discriminator)

            rank.build().then(data => {

                const attachment = new MessageAttachment(data, 'rankcard.png')
                message.reply({ files: [attachment] })

            })

        }

    }
