const { MessageEmbed } = require('discord.js')
const { Capitalize } = require('tech-tip-cyber') // npm i tech-tip-cyber@latest
const profileModel = require("../../models/profileSchema")

module.exports = {
    name: "coinflip",
    category: "Economy",
    aliases: ["cf"],
    cooldown: 15,
    description: 'Flip Coin And Earn $',
    usage: "?cf <cash/all>",

     async execute(client, message, args, discord, cmd, profileData) {

        const user = message.member
        let ht = (args[1] || "heads")
        if(args[1] == "t") {
            let ht = "tails"
            if(!ht) return message.reply(`What You Chose? heads or tails?`)
       
  if(args[0] == "all") {
let amount = 150000;
      if(profileData.coins === 0) return message.reply("u dont have enough money!")
      if(!amount) return message.reply(`Provide Amount`) // If No Amount Provided
        
        const coin = ['heads', 'tails'] // Coin Options

         
            if(!coin.includes(ht)) return message.reply(`It Should Be heads or tails Only`) // If Something Other Is Provided
            if(isNaN(amount)) return message.reply(`Amount Isn't A Number`) // If Amount Is Not A Number
            if(amount > profileData.coins) return message.reply(`You Dont Have That Much Money In Wallet`) // If User Provided Greater Money Then He Has
            if(amount < 500) return message.reply(`Need To Bet Atleast $500!`) // If Provided Amount Is Less Then $500
        

            const flip = coin[Math.floor(Math.random() * coin.length)]

            const fliped = Capitalize({ // For Making heads To Heads And tails To Tails
                Capital: flip
            })

            if(flip === ht) { // If Coin Fliped Is What User Provided
                const embed = new MessageEmbed()
.setAuthor(`${user.user.username} Fliped Coin`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('GREEN')
                .setDescription(`
<@${user.id}> Fliped Coin Which Landed On **${fliped}** And They Got :money_with_wings: ${amount}
                `)
                message.channel.send({embeds: [embed]})
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
            } else { // If Coin Fliped Is Not What User Provided
                const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} Fliped Coin`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RED')
                .setDescription(`
<@${user.id}> Fliped Coin Which Landed On **${fliped}** And They Lost ${amount}
                `)
                message.channel.send({embeds: [embed]})
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
      if(amount > 150000) {
message.reply("the largest bet is **$150000**")
        }
        if(!amount) return message.reply(`Provide Amount`) // If No Amount Provided
        
        const coin = ['heads', 'tails'] // Coin Options

         
            if(!coin.includes(ht)) return message.reply(`It Should Be heads or tails Only`) // If Something Other Is Provided
            if(isNaN(amount)) return message.reply(`Amount Isn't A Number`) // If Amount Is Not A Number
            if(amount > profileData.coins) return message.reply(`You Dont Have That Much Money In Wallet`) // If User Provided Greater Money Then He Has
            if(amount < 500) return message.reply(`Need To Bet Atleast $500!`) // If Provided Amount Is Less Then $500
        

            const flip = coin[Math.floor(Math.random() * coin.length)]

            const fliped = Capitalize({ // For Making heads To Heads And tails To Tails
                Capital: flip
            })

            if(flip === ht) { // If Coin Fliped Is What User Provided
                const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} Fliped Coin`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('GREEN')
                .setDescription(`
<@${user.id}> Fliped Coin Which Landed On **${fliped}** And They Got :money_with_wings: ${amount}
                `)
                message.channel.send({embeds: [embed]})
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
            } else { // If Coin Fliped Is Not What User Provided
                const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} Fliped Coin`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RED')
                .setDescription(`
<@${user.id}> Fliped Coin Which Landed On **${fliped}** And They Lost ${amount}
                `)
                message.channel.send({embeds: [embed]})
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
            }}
        } else {
        let ht = (args[1] || "heads")
        if(!ht) return message.reply(`What You Chose? heads or tails?`) // If No heads Or tails Provided
         if(args[1] === "t") {
let ht = "tails"
         } 
       
       let amount; 
  if(args[0] == "all") {
amount = 150000;
      if(profileData.coins === 0) return message.reply("u dont have enough money!")
      if(!amount) return message.reply(`Provide Amount`) // If No Amount Provided
        
        const coin = ['heads', 'tails'] // Coin Options

         
            if(!coin.includes(ht)) return message.reply(`It Should Be heads or tails Only`) // If Something Other Is Provided
            if(isNaN(amount)) return message.reply(`Amount Isn't A Number`) // If Amount Is Not A Number
            if(amount > profileData.coins) return message.reply(`You Dont Have That Much Money In Wallet`) // If User Provided Greater Money Then He Has
            if(amount < 500) return message.reply(`Need To Bet Atleast $500!`) // If Provided Amount Is Less Then $500
        

            const flip = coin[Math.floor(Math.random() * coin.length)]

            const fliped = Capitalize({ // For Making heads To Heads And tails To Tails
                Capital: flip
            })

            if(flip === ht) { // If Coin Fliped Is What User Provided
                const embed = new MessageEmbed()
.setAuthor(`${user.user.username} Fliped Coin`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('GREEN')
                .setDescription(`
<@${user.id}> Fliped Coin Which Landed On **${fliped}** And They Got :money_with_wings: ${amount}
                `)
                message.channel.send({embeds: [embed]})
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
            } else { // If Coin Fliped Is Not What User Provided
                const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} Fliped Coin`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RED')
                .setDescription(`
<@${user.id}> Fliped Coin Which Landed On **${fliped}** And They Lost ${amount}
                `)
                message.channel.send({embeds: [embed]})
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
    
amount = (args[0] || "1")
      if(amount > 150000) {
return message.reply("the largest bet is $150000")
}
        if(!amount) return message.reply(`Provide Amount`) // If No Amount Provided
        
        const coin = ['heads', 'tails'] // Coin Options

         
            if(!coin.includes(ht)) return message.reply(`It Should Be heads or tails Only`) // If Something Other Is Provided
            if(isNaN(amount)) return message.reply(`Amount Isn't A Number`) // If Amount Is Not A Number
            if(amount > profileData.coins) return message.reply(`You Dont Have That Much Money In Wallet`) // If User Provided Greater Money Then He Has
            if(amount < 500) return message.reply(`Need To Bet Atleast $500!`) // If Provided Amount Is Less Then $500
        

            const flip = coin[Math.floor(Math.random() * coin.length)]

            const fliped = Capitalize({ // For Making heads To Heads And tails To Tails
                Capital: flip
            })

            if(flip === ht) { // If Coin Fliped Is What User Provided
                const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} Fliped Coin`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('GREEN')
                .setDescription(`
<@${user.id}> Fliped Coin Which Landed On **${fliped}** And They Got :money_with_wings: ${amount}
                `)
                message.channel.send({embeds: [embed]})
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
            } else { // If Coin Fliped Is Not What User Provided
                const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} Fliped Coin`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RED')
                .setDescription(`
<@${user.id}> Fliped Coin Which Landed On **${fliped}** And They Lost ${amount}
                `)
                message.channel.send({embeds: [embed]})
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
}

  