const slotItems = ["😀", " 😂", "🥶", "😍"];
const db = require("quick.db");
const { MessageEmbed } = require('discord.js'); 
const profileModel = require("../../models/profileSchema") 

module.exports = {
        name:"slot",
        category: "Economy",
        usage: "/slot <amount>",
        aliases: ["s"],
        cooldown: 15,
        description: "Slot game",
        options: [
          {
            name: "amount",
            description: "<amount>/all",
            type: "STRING",
            required: true,
          }
        ],
    
     async execute(client,  interaction, options, profileData) {

    let user = interaction.user;
   let money;
         if ( interaction.options.getString("amount") == "all") {
money = 150000
    

    let moneyhelp = new MessageEmbed()
    .setColor("RED")
    .setDescription(`🛑 Specify the amount u wanna bet!`); 
         
    const lessmoney = new MessageEmbed()
    .setColor("RED")
    .setDescription("🛑 the smallest bet is 500!");
    
  const moneymore = new MessageEmbed()
  .setColor("RED")
  .setDescription("🛑 u dont have enough money!");
    
             
             if (150000 > profileData.coins) return interaction.reply({embeds: [moneymore]});
    if(money < 500) return interaction.reply({ embeds: [lessmoney]})
   
    if (!money) return interaction.reply({embeds: [moneyhelp]});
   

    let number = []
    for (let i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }
if (number[0] == "🥶" && number[1] == "🥶" && number[2] == "🥶")  { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] && number[1] == number[2])  { 
        money *= 3
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 0.5
        win = true;
    } else if (number[0] !== number[1] || number[1] !== number[2] || number[2] !== number[0]) {
 win = false;}
    if (win) {
        let slotsEmbed1 = new MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${money} coins`)
            .setColor("GREEN")
        interaction.reply({embeds: [slotsEmbed1]})
        await profileModel.findOneAndUpdate(
            {
              userID: interaction.user.id,
            },
            {
              $inc: {
                coins: +money,
              },
            }
          );
        
    } else {
        let slotsEmbed = new MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${money} coins`)
            .setColor("RED")
        interaction.reply({embeds: [slotsEmbed]})
        await profileModel.findOneAndUpdate(
            {
              userID: interaction.user.id,
            },
            {
              $inc: {
                coins: -money,
              },
            }
          );
    }
         } else {
             money =  interaction.options.getString("amount")
             if(money > 150000) return message.reply("the largest bet is **$150000**")


    let moneyhelp = new MessageEmbed()
    .setColor("RED")
    .setDescription(`🛑 Specify the amount u wanna bet!`); 
         
    const lessmoney = new MessageEmbed()
    .setColor("RED")
    .setDescription("🛑 the smallest bet is 500!");
             const moneymore = new MessageEmbed()
  .setColor("RED")
  .setDescription("🛑 u dont have enough money!");
    
  if (150000 > profileData.coins) return interaction.reply({embeds: [moneymore]});
  if(isNaN(money)) return message.reply(`Amount Isn't A Number`) // If Amount Is Not A Number
    if(money < 500) return  interaction.reply({ embeds: [lessmoney]})
   
    if (!money) return  interaction.reply({embeds: [moneyhelp]});
    

    let number = []
    for (let i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }
if (number[0] == "🥶" && number[1] == "🥶" && number[2] == "🥶")  { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] && number[1] == number[2])  { 
        money *= 3
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 0.5
        win = false;
    }else if (number[0] !== number[1] || number[1] !== number[2] || number[2] !== number[0]) {
 win = false;}
    if (win) {
        let slotsEmbed1 = new MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${money} coins`)
            .setColor("GREEN")
        interaction.reply({embeds: [slotsEmbed1]})
        await profileModel.findOneAndUpdate(
            {
              userID: interaction.user.id,
            },
            {
              $inc: {
                coins: +money,
              },
            }
          );
        
    } else {
        let slotsEmbed = new MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${money} coins`)
            .setColor("RED")
        interaction.reply({embeds: [slotsEmbed]})
        await profileModel.findOneAndUpdate(
            {
              userID: interaction.user.id,
            },
            {
              $inc: {
                coins: -money,
              },
            }
          );
    }
         }}}