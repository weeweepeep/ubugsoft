const { MessageEmbed } = require("discord.js")

const db = require("quick.db")

let wrong = "#F04A47"
let right = "#43B581"

module.exports = {
    name: "warn", 
    description: "warn a user",
    permissions: "ADMINISTRATOR",
    usage: "warn @<user> <reason>",
   category: "Moderation",
   options: [
       {
           name: "user",
           description: "the user u wanna warn",
           type: 9,
           required: true,
       },
       {
           name: "reason",
           description: "the reason to warn the user",
           type: 3,
           required: false
       }
   ],
    async execute(client, interaction) {
        try{


            const target = interaction.options.getMentionable("user")
            if(!target) {
                const embed = new MessageEmbed()
                .setDescription(`:x:**u must mention the user u want to warn**`)
                .setColor(wrong)
                return interaction.reply({ embeds: [embed]})
            }

            if(target.id === client.user.id){
                const embed = new MessageEmbed()
                .setDescription(`:x:**u cannot warn bots!**`)
                .setColor(wrong)
                return interaction.reply({ embeds: [embed]})
            }

            if(target.id === interaction.user.id) {
                const embed = new MessageEmbed()
                .setDescription(`**:x:  u cant warn urself!**`)
                .setColor(wrong)
                return interaction.reply({ embeds: [embed]})
            }

            if(interaction.member.roles.highest.comparePositionTo(interaction.mentions.members.first().roles.highest) < 1) {
                const embed = new MessageEmbed()
                .setDescription(`:x:**u cant warn a user that has a higher or same role as u!`)
                .setColor(wrong)
                return interaction.reply({ embeds: [embed]})
            }

            let reason = interaction.options.getString("reason")

            if(!reason) {
                const embed = new MessageEmbed()
                .setDescription(`:x:**please provide a valid reason to warn that user!**`)
                .setColor(wrong)
                return interaction.reply({ embeds: [embed]})
            }

            db.add(`warns_${target.id}`, 1)
            let x = db.get(`warns_${target.id}`)

            const embed = new MessageEmbed()
            .setDescription(`:white_check_mark:**${target.username} has been warned ${x} times!**`)
            .setColor(right)
            interaction.reply({ embeds: [embed]})

            try{

                let embed = new MessageEmbed()
                .setDescription(`:warning: u have been warned in **${interaction.guild.name}** by ${interaction.user.username}!`)
                .setFooter(`Reason: ${reason}`)
                .setColor("#FFFF00")
                target.send({embeds: [embed]})

            } catch (err) {
                console.log(err)
                const embed = new MessageEmbed()
                .setDescription(`**cannot send interactions to that user!**`)
                .setColor(wrong)
                return interaction.reply({embeds: [embed]})
            }

           
            
        } catch (err) {
            console.log(err)
            const embed = new MessageEmbed()
            .setDescription(`**${cross} an unknown error occured!**`)
            .setColor(wrong)
            return interaction.reply({embeds: [embed]})
        }
    }
}