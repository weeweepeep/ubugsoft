const Discord = require("discord.js")
const client = require("../index")
const Levels = require("discord-xp")
const profileModel = require("../models/profileSchema")
const { levelupCard } = require('@discord-card/levelcard');
require('dotenv').config()
Levels.setURL(process.env.MONGO_DB)

client.on("messageCreate", async (message, user) => {
if (message.author.bot || !message.guild) return
        const userlevel = await Levels.fetch(message.author.id, message.guild.id)
        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp)
        const image = await levelupCard(message.member, {level: userlevel.level});
        const card = new Discord.MessageAttachment(image, 'https://getwallpapers.com/wallpaper/full/1/9/7/797511-gorgerous-pics-of-cool-wallpapers-1920x1200.jpg')

        if (hasLeveledUp) {
             
                message.channel.send({content: `Congrats ${message.author}, you've leveled up and recieved **10000** cash!`, files: [card] })
           profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: 10000,
          },
        }
      );

        }
            })