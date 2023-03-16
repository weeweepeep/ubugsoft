const slotItems = ["😀", " 😂", "🥶", "😍"];
const db = require("quick.db");
const { MessageEmbed } = require('discord.js'); 
const profileModel = require("../../models/profileSchema") 

module.exports = {
        name:"slot",
        category: "Economy",
        aliases: ["s"],
        cooldown: 15,
        description: "Slot game",
        usage: "?slot <amount>",
    
     async execute(client, message, args, Discord, cmd, profileData) {

   let money;
         if (args[0] == "all") {
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
    
             
    if (money > profileData.coins) return message.reply({embeds: [moneymore]});
    if(money < 500) return message.reply({ embeds: [lessmoney]})
    if(isNaN(money)) return message.reply(`Amount Isn't A Number`) // If Amount Is Not A Number
    if (!money) return message.reply({embeds: [moneyhelp]});
   
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
        message.reply({embeds: [slotsEmbed1]})
        await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
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
        message.reply({embeds: [slotsEmbed]})
        await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc: {
                coins: -money,
              },
            }
          );
    }
         } else {
             money = parseInt(args[0])

    let moneyhelp = new MessageEmbed()
    .setColor("RED")
    .setDescription(`🛑 Specify the amount u wanna bet!`); 
         
    const lessmoney = new MessageEmbed()
    .setColor("RED")
    .setDescription("🛑 the smallest bet is 500!");
             const moneymore = new MessageEmbed()
  .setColor("RED")
  .setDescription("🛑 u dont have enough money!");
    
    if (money > profileData.coins) return message.reply({embeds: [moneymore]});
    if(isNaN(money)) return message.reply(`Amount Isn't A Number`) // If Amount Is Not A Number
    if(money < 500) return message.reply({ embeds: [lessmoney]})
    if (!money) return message.reply({embeds: [moneyhelp]});
    if(money > 150000) return message.reply("the largest bet is **$150000**")

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
        message.reply({embeds: [slotsEmbed1]})
        await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
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
        message.reply({embeds: [slotsEmbed]})
        await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc: {
                coins: -money,
              },
            }
          );
    }
         }}}