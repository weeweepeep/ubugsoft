const { MessageEmbed } = require("discord.js")

const db = require("quick.db")

let wrong = "#F04A47"
let right = "#43B581"

module.exports = {
    name: "warn", 
    description: "warn a user",
    permissions: ["ADMINISTRATOR"],
    usage: "warn @<user> <reason>",
   category: "Moderation",
    async execute(client, message, args) {
        try{


            const target = message.mentions.users.first()
            if(!target) {
                const embed = new MessageEmbed()
                .setDescription(`:x:**u must mention the user u want to warn**`)
                .setColor(wrong)
                return message.channel.send({ embeds: [embed]})
            }

            if(target.id === client.user.id){
                const embed = new MessageEmbed()
                .setDescription(`:x:**u cannot warn bots!**`)
                .setColor(wrong)
                return message.channel.send({ embeds: [embed]})
            }

            if(target.id === message.author.id) {
                const embed = new MessageEmbed()
                .setDescription(`**:x:  u cant warn urself!**`)
                .setColor(wrong)
                return message.channel.send({ embeds: [embed]})
            }

            if(message.member.roles.highest.comparePositionTo(message.mentions.members.first().roles.highest) < 1) {
                const embed = new MessageEmbed()
                .setDescription(`:x:**u cant warn a user that has a higher or same role as u!`)
                .setColor(wrong)
                return message.channel.send({ embeds: [embed]})
            }

            let reason = args.slice(1).join(" ")

            if(!reason) {
                const embed = new MessageEmbed()
                .setDescription(`:x:**please provide a valid reason to warn that user!**`)
                .setColor(wrong)
                return message.channel.send({ embeds: [embed]})
            }

            db.add(`warns_${target.id}`, 1)
            let x = db.get(`warns_${target.id}`)

            const embed = new MessageEmbed()
            .setDescription(`:white_check_mark:**${target.username} has been warned ${x} times!**`)
            .setColor(right)
            message.channel.send({ embeds: [embed]})

            try{

                let embed = new MessageEmbed()
                .setDescription(`:warning: u have been warned in **${message.guild.name}** by ${message.author.username}!`)
                .setFooter(`Reason: ${reason}`)
                .setColor("#FFFF00")
                target.send({embeds: [embed]})

            } catch (err) {
                console.log(err)
                const embed = new MessageEmbed()
                .setDescription(`**cannot send messages to that user!**`)
                .setColor(wrong)
                return message.channel.send({embeds: [embed]})
            }

           
            
        } catch (err) {
            console.log(err)
            const embed = new MessageEmbed()
            .setDescription(`**${cross} an unknown error occured!**`)
            .setColor(wrong)
            return message.channel.send({embeds: [embed]})
        }
    }
}