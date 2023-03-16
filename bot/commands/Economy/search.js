const { MessageEmbed } = require('discord.js')
const { Capitalize } = require('tech-tip-cyber')
const profileModel = require("../../models/profileSchema")

module.exports = {
    name: "search", // You Can Keep Any Name
    description: 'Search For Money', // Optional
    usage: "?search",
    cooldown: 20,

    execute: async (client, message, args) => {

        const user = message.member

        
            const locations = [
                "car",
                "sock",
                "wallet",
                "box",
                "pocket",
                "bus",
                "park",
                "train",
                "lounge",
                "keyboard",
                "bathroom",
                "bed",
                "sofa",
                "backpack",
                "laptop",
                "sewer",
                "pantry",
                "shoe",
                "tree",
                "air",
                "street",
                "attic",
                "grass",
                "bus",
                 "car",
            "bathroom",
            "park",
            "truck",
            "pocket",
            "computer",
            "Discord",
            "air",
            "larry's home",
            "trash can",
            "hospital",
            "police station",
            "god's house",
            "a uber",
            "Area 51",
            "Bank",
            "Crawlspace"
            ]
            let location = locations.sort(() =>
                Math.random() - Math.random()
            ).slice(0, 3) // Get 3 Options From locations

            const amount = Math.floor(Math.random() * 1000) + 500 // Minimum = 500 , Maximum = 2000

            message.reply(`<@${user.id}> Where Do You Want To Search?\n\`${location.join("` `")}\``) // Send Message With Options

            const filter = (m) => {
                return m.author.id === user.id // To Check Is Messages User ID Is Same As Who Used Command
            }
            const collector = message.channel.createMessageCollector({filter, 
                max: 1,
                time: 40000, // 40000 = 40 Seconds
            })

            collector.on('collect', async (m) => { // If User Gave Correct Option
            
                const searched = Capitalize({
                    Capital: m.content
                })

                const embed = new MessageEmbed()
                    .setAuthor(`${user.user.username} Searched`, user.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor('GREEN')
                    .setDescription(`
You Searched For Money In **${searched}** And Found **$${amount.toLocaleString()}**
                `)
                message.reply({ embeds: [embed]})
                await profileModel.findOneAndUpdate(
             {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: amount,
          },
        }
      );
                collector.stop()
            })
            collector.on('end', collected => { // If User Didn't Answer In Time
                if(collected.size === 0) {
                    message.reply(`<@${user.id}> Your Time Finished, Their Was **$${amount.toLocaleString()}** In Those Place`)
                    collector.stop()
                }
            })
        }
    }