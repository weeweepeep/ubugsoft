module.exports = {
    name: 'unmute',
    permissions: "ADMINISTRATOR",
    description: "This unmutes a member",
    category: "Moderation",
    options: [
        {
            name: "user",
            description: "the user to unmute",
            type: 9,
            required: true,
        }
    ],
    execute(client, interaction, options, Discord){
        const target = interaction.options.getMentionable("user")
        let mainRole = interaction.guild.roles.cache.find(role => role.name === 'member');
            let muteRole = interaction.guild.roles.cache.find(role => role.name === 'muted');
            
            let memberTarget= interaction.guild.members.cache.get(target.id);
        const embed = new Discord.MessageEmbed()
        .setTitle('User Unmuted.')
        .setDescription(`<@${target.id}> Is Now Unmuted.`)
        .setFooter(`unMuted by ${interaction.user.tag}`)
        .setColor('GREEN')
          if(target == interaction.guild.ownerId) {
            interaction.reply("u cant mute the owner of the server!")
            return
        } else if(target) {
            
           
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            interaction.reply({ embeds: [embed]});
        } else {
            interaction.reply('cant find that member!');
        }
    }
}