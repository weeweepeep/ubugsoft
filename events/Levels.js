const Discord = require("discord.js")
require('dotenv').config()
const { MessageAttachment } = require("discord.js")
const canvacord = require("canvacord")
const client = require("../index")
const Levels = require("discord-xp")
const profileModel = require("../models/profileSchema")
Levels.setURL(process.env.MONGO_DB)

client.on("messageCreate", async (message, user) => {
if (message.author.bot || !message.guild) return
        const userlevel = await Levels.fetch(message.author.id, message.guild.id, true)
        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp)
         
        if (hasLeveledUp) {
             
                message.channel.send({content: `Congrats ${message.author}, you've now reached **Level ${userlevel.level}** and recieved **10000** cash!` })
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