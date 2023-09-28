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
    options: [
      {
        name: "amount",
        description: "the amount u wanna bet",
        type: "STRING",
        required: true,
      }
    ],
    async execute(client, interaction, options, profileData)  {
    
        let game = await blackjack(interaction, {resultEmbed: false})
        let amount;
        if(interaction.options.getString("amount") == "all") {
            amount = 150000;
             if(profileData.coins === 0) return interaction.reply("u dont have enough money!")
        
        switch (game.result) {
            
            case "WIN":
                     const embed = new MessageEmbed()
                    .setTitle("You won!")
                    .setDescription(`you won 💸**${amount}** amount of cash!`)
                    .setColor("GREEN");
                interaction.reply({ embeds: [embed]})
                await profileModel.findOneAndUpdate(
             {
          userID: interaction.user.id,
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
                interaction.reply({ embeds: [loseembed]})
                await profileModel.findOneAndUpdate(
             {
          userID: interaction.user.id,
        },
        {
          $inc: {
            coins: -amount,
          },
        }
      );
            
        }
        
    } else {
        amount = interaction.options.getString("amount")
         if(isNaN(amount)) return interaction.reply(`Please provide a valid amount!`)
        if(amount > 150000) {
interaction.reply("the largest bet is **$150000**")
        }
        if(!amount) return interaction.reply("u need to provide an amount to bet!")
        if(150000 > profileData.coins) return interaction.reply("u dont have that amount of money!")
        if(amount < 500) return interaction.reply("the smallest bet is 💸**500**")
        
        switch (game.result) {
            
            case "WIN":
                     const embed = new MessageEmbed()
                    .setTitle("You won!")
                    .setDescription(`you won 💸**${amount}** amount of cash!`);
                interaction.reply({ embeds: [embed]})
                await profileModel.findOneAndUpdate(
             {
          userID: interaction.user.id,
        },
        {
          $inc: {
            coins: amount,
          },
        }
      );
               
                break;
            case "LOSE":
                interaction.reply(`you lost 💸**${amount}** dollars!`)
                await profileModel.findOneAndUpdate(
             {
          userID: interaction.user.id,
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
