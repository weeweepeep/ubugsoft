const { MessageEmbed } = require("discord.js")
const profileModel = require("../../models/profileSchema")

module.exports = {
    name: "steal",
    cooldown: 60,
    description: "steal money from someone",
    usage: "?steal @<user>",
    options: [
      {
        name: "user",
        description: "the user u want to steal from",
        type: "USER",
        required: true
      }
    ],
    async execute(client,  interaction, options, profileData) {
        const target = interaction.options.getUser("user")
        if(target.id == interaction.user.id) return interaction.reply("are you stupid? you cant rob yourself!")
        if(target.id == "950400365885530152") return interaction.reply("you cant rob me! im the boss behind everything!")
        const amount = Math.floor(Math.random() * 5000) + 1000
        if (profileData.coins < amount) return interaction.reply("you dont even have the money yourself, rob again later with the amount you have")
        const targetcoin = await profileModel.findOne({ userID: target.id })
        if(!targetcoin) return interaction.reply("🛑 Failed to rob that user!")
        if (targetcoin < amount) return interaction.reply("the user does not have enough to be robbed")
        const moneyhelp = new MessageEmbed()
      .setColor("RED")
      .setDescription(`🛑 Specify the amount u wanna bet!`);

        if (!amount) return interaction.reply({embeds: [moneyhelp]});
        if(isNaN(amount)) return interaction.reply(`Amount Isn't A Number`)

        const i = ["1", "2", "3"]
        const number = Math.floor(Math.random() * (i.length))
        if (i[number] == "1") {
            const embed = new MessageEmbed()
            .setTitle(`You just stole from ${target.username}!`)
            .setColor("GREEN")
            .setDescription(`${interaction.user} took :money_with_wings:**${amount}** from ${target}!`)
            interaction.reply({embeds: [embed]})
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
         userID: interaction.user.id,
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
            .setDescription(`The police just took :money_with_wings:**${amount}** from ${interaction.user}!`)
            interaction.reply({ embeds: [embed]})
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
        } else if (i[number] == "3") {
            const embed = new MessageEmbed()
            .setTitle(`You failed to rob ${target.username}!`)
            .setColor("RED")
            .setDescription(`The police just took :money_with_wings:**${amount}** from ${interaction.user}!`)
            interaction.reply({ embeds: [embed]})
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