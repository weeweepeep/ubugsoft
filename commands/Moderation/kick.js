const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'kick',
  description: 'Ban A User',
  usage: 'ban <user> <reason>',
  permissions: ['BAN_MEMBERS'],
  execute: async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member)
    return message.channel.send(`🛑 Please Mention A Valid User Or Provide Valid User ID!`)
    if(member === message.member)
    return message.channel.send(`🛑 Cannot kick Yourself!`)
    if(member.roles.highest.position >= message.member.roles.highest.position)
    return message.channel.send(`🛑 You Cannot kick Semeone With An Equal Higher Role!`)
    if(!member.bannable)
    return message.channel.send(`🛑Provided Member Is Not kickable!`);
    let reason = args.slice(1).join(' ');
    if(!reason) reason = '`None`';
    if(reason.lenght > 1024) reason = reason.slice(0, 1021) + '...';
    await member.kick ({ reason: reason });
    const embed = new MessageEmbed()
    .setTitle('Ban Member!')
    .setDescription(`<:th:951655495377227846> ${member} Was Successfully kicked`)
    .addField('Reason', `${reason}`)
    .setFooter(message.member.displayName, message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setColor('#F871A0');
    message.channel.send({ embeds: [embed] })
  }
}