const blackjack = require("discord-blackjack")
const profileModel = require("../../models/profileSchema")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "blackjack",
    category: "Economy",
    aliases: ["bj"],
    cooldown: 15,
    description: 'play a bj game and earn $',
    usage: "?bj <cash/all>",
    async execute(client, message, args, Discord, cmd, profileData) {

        if (args[0] == "all") {
          let amount = 150000

      const moneyhelp = new MessageEmbed()
      .setColor("RED")
      .setDescription(`🛑 Specify the amount u wanna bet!`);      
      const lessmoney = new MessageEmbed()
      .setColor("RED")
      .setDescription("🛑 the smallest bet is 500!");
      const moneymore = new MessageEmbed()
      .setColor("RED")
      .setDescription("🛑 u dont have enough money!");
  
      
               
              if (amount > profileData.coins) return message.reply({embeds: [moneymore]});
              if(amount < 500) return message.reply({ embeds: [lessmoney]})
              if (!amount) return message.reply({embeds: [moneyhelp]});
              if(isNaN(amount)) return message.reply(`Amount Isn't A Number`) // If Amount Is Not A Number

        let game = await blackjack(message, {resultEmbed: false})
        const winembed = new MessageEmbed()
                    .setTitle("You won!")
                    .setColor("GREEN")
                    .setDescription(`You won :money_with_wings: **${amount}** cash!`)
        const loseembed = new MessageEmbed()
                    .setTitle("You lose!")
                    .setColor("RED")
                    .setDescription(`You lose :money_with_wings: **${amount}** cash!`)
        switch (game.result) {
            
            case "WIN":
                message.reply({ embeds: [winembed] })
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
                message.reply({ embeds: [loseembed] })
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
        let amount = args[0]
          let moneyhelp = new MessageEmbed()
      .setColor("RED")
      .setDescription(`🛑 Specify the amount u wanna bet!`); 
           
      const lessmoney = new MessageEmbed()
      .setColor("RED")
      .setDescription("🛑 the smallest bet is 500!");
      
    const moneymore = new MessageEmbed()
    .setColor("RED")
    .setDescription("🛑 u dont have enough money!");
  
    const hdsortls = new MessageEmbed()
    .setColor("RED")
    .setDescription("🛑 it should onlt be heads or tails!")
      
               
              if (amount > profileData.coins) return message.reply({embeds: [moneymore]});
              if(amount < 500) return message.reply({ embeds: [lessmoney]})
              if (!amount) return message.reply({embeds: [moneyhelp]});
              if(isNaN(amount)) return message.reply(`Amount Isn't A Number`) // If Amount Is Not A Number

        let game = await blackjack(message, {resultEmbed: false})
        const winembed = new MessageEmbed()
                    .setTitle("You won!")
                    .setColor("GREEN")
                    .setDescription(`You won :money_with_wings: **${amount}** cash!`)
        const loseembed = new MessageEmbed()
                    .setTitle("You lose!")
                    .setColor("RED")
                    .setDescription(`You lose :money_with_wings: **${amount}** cash!`)
        switch (game.result) {
            
            case "WIN":
                message.reply({ embeds: [winembed]})
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
                message.reply({ embeds: [loseembed] })
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