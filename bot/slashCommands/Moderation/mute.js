const { MessageEmbed } = require("discord.js")
let wrong = "#F04A47"

const ms = require('ms')
module.exports = {
    name: 'mute',
    permissions: "ADMINISTRATOR",
    description: "This mutes a member",
    category: "Moderation",
    usage: "/mute @<user>",
    options: [
        {
            name: "user",
            description: "the user to mute",
            type: 9,
            required: true,
        },
        {
            name: "time",
            description: "the time u want to mute the user",
            type: 4,
            required: false,
        }
    ],
    execute(client, interaction, options){
        const target = interaction.options.getMentionable("user")
         let memberTarget= interaction.guild.members.cache.get(target.id);
        let muteRole = interaction.guild.roles.cache.find(role => role.name === 'muted');
         if(target == interaction.guild.ownerId){
            interaction.reply("u cant mute the owner of the server!")
            return
        } else if(target){
            const embed = new MessageEmbed()
        .setTitle('User Muted')
        .setDescription(`<@${target.id}> Has Been Muted.`)
        .setFooter(`Muted by ${interaction.user.tag}`)
        .setColor('RED')

            if(!interaction.options.getInteger("time")){
            memberTarget.roles.add(muteRole.id);
            interaction.reply({ embeds: [embed]});
            return
            }
           
            memberTarget.roles.add(muteRole.id);
            const tempembed = new MessageEmbed()
        .setTitle('User temp Muted')
        .setDescription(`**<@${target.id}>** has been muted for ${ms(ms(interaction.options.getInteger("time")))}`)
        .setFooter(`Muted by ${interaction.user.tag}`)
        .setColor('RED')
            interaction.reply({ embeds: [tempembed]});

            setTimeout(function() {
            memberTarget.roles.remove(muteRole.id);
            
       },  ms(interaction.options.getInteger("time")))
            
            
 
        }  else {
            interaction.reply("u couldnt mute that member!")
        } 
    }
}