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
    options: [
      {
        name: "amount",
        description: "the amount u wanna bet",
        type: "STRING",
        required: true,
      },
      {
        name: "options",
        description: "choose heads or tails",
        type: 3,
        required: false,
      }
    ],

     async execute(client, interaction, options, profileData) {

        const user = interaction.member
        let ht = (interaction.options.getString("heads or tails") || "heads")
        if(interaction.options.getString("heads or tails") == "t") {
            let ht = "tails"
            if(!ht) return interaction.reply(`What You Chose? heads or tails?`)
       
  if(interaction.options.getString("amount") == "all") {
let amount = 150000;
      if(profileData.coins === 0) return interaction.reply("u dont have enough money!")
      if(!amount) return interaction.reply(`Provide Amount`) // If No Amount Provided
        
        const coin = ['heads', 'tails'] // Coin Options

         
            if(!coin.includes(ht)) return interaction.reply(`It Should Be heads or tails Only`) // If Something Other Is Provided
            if(isNaN(amount)) return interaction.reply(`Amount Isn't A Number`) // If Amount Is Not A Number
            if(150000 > profileData.coins) return interaction.reply(`You Dont Have That Much Money In Wallet`) // If User Provided Greater Money Then He Has
            if(amount < 500) return interaction.reply(`Need To Bet Atleast $500!`) // If Provided Amount Is Less Then $500
        

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
                interaction.reply({embeds: [embed]})
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
            } else { // If Coin Fliped Is Not What User Provided
                const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} Fliped Coin`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RED')
                .setDescription(`
<@${user.id}> Fliped Coin Which Landed On **${fliped}** And They Lost ${amount}
                `)
                interaction.reply({embeds: [embed]})
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
      if(amount > 150000) {
interaction.reply("the largest bet is **$150000**")
        }
        if(!amount) return interaction.reply(`Provide Amount`) // If No Amount Provided
        
        const coin = ['heads', 'tails'] // Coin Options

         
            if(!coin.includes(ht)) return interaction.reply(`It Should Be heads or tails Only`) // If Something Other Is Provided
            if(isNaN(amount)) return interaction.reply(`Amount Isn't A Number`) // If Amount Is Not A Number
            if(amount > profileData.coins) return interaction.reply(`You Dont Have That Much Money In Wallet`) // If User Provided Greater Money Then He Has
            if(amount < 500) return interaction.reply(`Need To Bet Atleast $500!`) // If Provided Amount Is Less Then $500
        

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
                interaction.reply({embeds: [embed]})
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
            } else { // If Coin Fliped Is Not What User Provided
                const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} Fliped Coin`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RED')
                .setDescription(`
<@${user.id}> Fliped Coin Which Landed On **${fliped}** And They Lost ${amount}
                `)
                interaction.reply({embeds: [embed]})
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
            }}
        } else {
        let ht = (interaction.options.getString("heads or tails") || "heads")
        if(!ht) return interaction.reply(`What You Chose? heads or tails?`) // If No heads Or tails Provided
         if(interaction.options.getString("heads or tails") === "t") {
let ht = "tails"
         } 
       
       let amount; 
  if(interaction.options.getString("amount") == "all") {
amount = 150000;
      if(profileData.coins === 0) return interaction.reply("u dont have enough money!")
      if(!amount) return interaction.reply(`Provide Amount`) // If No Amount Provided
        
        const coin = ['heads', 'tails'] // Coin Options

         
            if(!coin.includes(ht)) return interaction.reply(`It Should Be heads or tails Only`) // If Something Other Is Provided
            if(isNaN(amount)) return interaction.reply(`Amount Isn't A Number`) // If Amount Is Not A Number
            if(amount > profileData.coins) return interaction.reply(`You Dont Have That Much Money In Wallet`) // If User Provided Greater Money Then He Has
            if(amount < 500) return interaction.reply(`Need To Bet Atleast $500!`) // If Provided Amount Is Less Then $500
        

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
                interaction.reply({embeds: [embed]})
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
            } else { // If Coin Fliped Is Not What User Provided
                const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} Fliped Coin`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RED')
                .setDescription(`
<@${user.id}> Fliped Coin Which Landed On **${fliped}** And They Lost ${amount}
                `)
                interaction.reply({embeds: [embed]})
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
    
amount = (interaction.options.getString("amount"))
      if(amount > 150000) {
return interaction.reply("the largest bet is $150000")
}
        if(!amount) return interaction.reply(`Provide Amount`) // If No Amount Provided
        
        const coin = ['heads', 'tails'] // Coin Options

         
            if(!coin.includes(ht)) return interaction.reply(`It Should Be heads or tails Only`) // If Something Other Is Provided
            if(isNaN(amount)) return interaction.reply(`Amount Isn't A Number`) // If Amount Is Not A Number
            if(amount > profileData.coins) return interaction.reply(`You Dont Have That Much Money In Wallet`) // If User Provided Greater Money Then He Has
            if(amount < 500) return interaction.reply(`Need To Bet Atleast $500!`) // If Provided Amount Is Less Then $500
        

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
                interaction.reply({embeds: [embed]})
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
            } else { // If Coin Fliped Is Not What User Provided
                const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} Fliped Coin`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RED')
                .setDescription(`
<@${user.id}> Fliped Coin Which Landed On **${fliped}** And They Lost ${amount}
                `)
                interaction.reply({embeds: [embed]})
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
}

  