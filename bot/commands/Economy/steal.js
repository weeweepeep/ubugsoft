const { MessageEmbed } = require("discord.js")
const profileModel = require("../../models/profileSchema")

module.exports = {
    name: "steal",
    cooldown: 60,
    description: "steal money from someone",
    usage: "?steal @<user>",
    async execute(client, message, args, Discord, cmd, profileData) {
        const target = message.mentions.users.first()
        if(target.id == "950400365885530152") return message.reply("you cant rob me! im the boss behind everything!")
        if(target.id == message.author.id) return message.reply("are you stupid? you cant rob yourself!")
        if(!target) return message.reply("who do u want to steal from?")
        const amount = Math.floor(Math.random() * 5000) + 1000
        if (profileData.coins < amount) return message.reply("you dont even have the money yourself, rob again later with the amount you have")
        const targetcoin = await profileModel.findOne({ userID: target.id })
        if(!targetcoin) return message.reply("🛑 Failed to rob that user!")
        if (targetcoin < amount) return message.reply("the user does not have enough to be robbed")
        const moneyhelp = new MessageEmbed()
      .setColor("RED")
      .setDescription(`🛑 Specify the amount u wanna bet!`);

        if (!amount) return message.reply({embeds: [moneyhelp]});
        if(isNaN(amount)) return message.reply(`Amount Isn't A Number`)

        const i = ["1", "2", "3"]
        const number = Math.floor(Math.random() * (i.length))
        if (i[number] == "1") {
            const embed = new MessageEmbed()
            .setTitle(`You just stole from ${target.username}!`)
            .setColor("GREEN")
            .setDescription(`${message.author} took :money_with_wings:**${amount}** from ${target}!`)
            message.reply({embeds: [embed]})
            await profileModel.findOneAndUpdate(
                {
             userID: target.id,
           },
           {
             $inc: {
               coins: -amount,
             },
           }
         );
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
        } else if (i[number] == "2") {
            const embed = new MessageEmbed()
            .setTitle(`You failed to rob ${target.username}!`)
            .setColor("RED")
            .setDescription(`The police just took :money_with_wings:**${amount}** from ${message.author}!`)
            message.reply({ embeds: [embed]})
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
        } else if (i[number] == "3") {
            const embed = new MessageEmbed()
            .setTitle(`You failed to rob ${target.username}!`)
            .setColor("RED")
            .setDescription(`The police just took :money_with_wings:**${amount}** from ${message.author}!`)
            message.reply({ embeds: [embed]})
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