const { MessageEmbed } = require("discord.js")
let wrong = "#F04A47"

const ms = require('ms')
module.exports = {
    name: 'mute',
    permissions: ["ADMINISTRATOR"],
    description: "This mutes a member",
    category: "Moderation",
    usage: "?mute @<user>",
    execute(client, message, args, Discord){
        const target = message.mentions.users.first();
         let memberTarget= message.guild.members.cache.get(target.id);
        let muteRole = message.guild.roles.cache.find(role => role.name === 'muted');
         if(target == message.guild.ownerId){
            message.reply("u cant mute the owner of the server!")
            return
        } else if(target){
            const embed = new MessageEmbed()
        .setTitle('User Muted')
        .setDescription(`<@${target.id}> Has Been Muted.`)
        .setFooter(`Muted by ${message.author.tag}`)
        .setColor('RED')

            if(!args[1]){
            memberTarget.roles.add(muteRole.id);
            message.reply({ embeds: [embed]});
            return
            }
           
            memberTarget.roles.add(muteRole.id);
            const tempembed = new MessageEmbed()
        .setTitle('User temp Muted')
        .setDescription(`**<@${target.id}>** has been muted for ${ms(ms(args[1]))}`)
        .setFooter(`Muted by ${message.author.tag}`)
        .setColor('RED')
            message.reply({ embeds: [tempembed]});

            setTimeout(function() {
            memberTarget.roles.remove(muteRole.id);
            
       },  ms(args[1]))
            
            
 
        }  else {
            message.reply("u couldnt mute that member!")
        } 
    }
}