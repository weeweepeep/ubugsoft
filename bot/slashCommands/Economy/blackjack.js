const blackjack = require("discord-blackjack")
const profileModel = require("../../models/profileSchema")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "blackjack",
    category: "Economy",
    aliases: ["bj"],
    cooldown: 15,
    description: 'play a bj game and earn $',
    usage: "/bj <cash/all>",
    options: [
      {
        name: "amount",
        description: "amount u wanna bet",
        type: "STRING",
        required: true
      }
    ],
    async execute(client, interaction, options,  Discord, profileData) {

        if (interaction.options.getString("amount") == "all") {
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
  
      
               
              if (amount > profileData.coins) return interaction.reply({embeds: [moneymore]});
              if(amount < 500) return interaction.reply({ embeds: [lessmoney]})
              if (!amount) return interaction.reply({embeds: [moneyhelp]});
              if(isNaN(amount)) return interaction.reply(`Amount Isn't A Number`) // If Amount Is Not A Number

        let game = await blackjack(interaction, {resultEmbed: false})
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
                interaction.reply({ embeds: [winembed]})
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
                interaction.reply({ embeds: [loseembed] })
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
        let amount = interaction.options.getString("amount")
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
      
               
              if (amount > profileData.coins) return interaction.reply({embeds: [moneymore]});
              if(amount < 500) return interaction.reply({ embeds: [lessmoney]})
              if (!amount) return interaction.reply({embeds: [moneyhelp]});
              if(isNaN(amount)) return interaction.reply(`Amount Isn't A Number`) // If Amount Is Not A Number

        let game = await blackjack(interaction, {resultEmbed: false})
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
                interaction.reply({ embeds: [winembed]})
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
                interaction.reply({ embeds: [loseembed] })
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