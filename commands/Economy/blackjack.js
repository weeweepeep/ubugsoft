const blackjack = require("discord-blackjack")
const { MessageEmbed } = require("discord.js")
const profileModel = require("../../models/profileSchema")

module.exports = {
    name: "blackjack",
    category: "Economy",
    aliases: ["bj"],
    description: "blackjack the amount u want",
    cooldown: 13,
    usage: "?blackjack <cash/all>",
    async execute(client, message, args, Discord, cmd, profileData)  {
    
        let game = await blackjack(message, {resultEmbed: false})
        let amount;
        if(args[0] == "all") {
            amount = 150000;
             if(profileData.coins === 0) return message.reply("u dont have enough money!")
        
        switch (game.result) {
            
            case "WIN":
                     const embed = new MessageEmbed()
                    .setTitle("You won!")
                    .setDescription(`you won 💸**${amount}** amount of cash!`)
                    .setColor("GREEN");
                message.channel.send({ embeds: [embed]})
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
               
                break;
            case "LOSE":
                const loseembed = new MessageEmbed()
                .setTitle("you lose!")
                .setDescription(`you lost 💸**${amount}** dollars!`)
                .setColor("RED")
                message.channel.send({ embeds: [loseembed]})
                await profileModel.findOneAndUpdate(
             {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: -amount,
          },
        }
      );
            
        }
        
    } else {
        amount = parseInt(args[0])
         if(isNaN(amount)) return message.reply(`Please provide a valid amount!`)
        if(amount > 150000) {
message.reply("the largest bet is **$150000**")
        }
        if(!amount) return message.reply("u need to provide an amount to bet!")
        if(amount > profileData.coins) return message.reply("u dont have that amount of money!")
        if(amount < 500) return message.reply("the smallest bet is 💸**500**")
        
        switch (game.result) {
            
            case "WIN":
                     const embed = new MessageEmbed()
                    .setTitle("You won!")
                    .setDescription(`you won 💸**${amount}** amount of cash!`);
                message.channel.send({ embeds: [embed]})
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
               
                break;
            case "LOSE":
                message.channel.send(`you lost 💸**${amount}** dollars!`)
                await profileModel.findOneAndUpdate(
             {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: -amount,
          },
        }
      );
            
        }
        
    }
    }
    }
