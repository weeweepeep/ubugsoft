module.exports = {
    name: 'unmute',
    permissions: ["ADMINISTRATOR"],
    description: "This unmutes a member",
    usage: "?unmute @<user>",
    category: "Moderation",
    execute(client, message, args, Discord){
        const target = message.mentions.users.first();
        let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'muted');
            
            let memberTarget= message.guild.members.cache.get(target.id);
        const embed = new Discord.MessageEmbed()
        .setTitle('User Unmuted.')
        .setDescription(`<@${target.id}> Is Now Unmuted.`)
        .setFooter(`unMuted by ${message.author.tag}`)
        .setColor('GREEN')
          if(target == message.guild.ownerId) {
            message.reply("u cant mute the owner of the server!")
            return
        } else if(target) {
            
           
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            message.channel.send({ embeds: [embed]});
        } else {
            message.channel.send('cant find that member!');
        }
    }
}