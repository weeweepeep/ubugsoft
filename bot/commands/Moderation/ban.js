const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'ban',
  description: 'Ban A User',
  usage: 'ban <user> <reason>',
  permissions: ['BAN_MEMBERS'],
  execute: async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member)
    return message.reply(`🛑 Please Mention A Valid User Or Provide Valid User ID!`)
    if(member === message.member)
    return message.reply(`🛑 Cannot Ban Yourself!`)
    if(member.roles.highest.position >= message.member.roles.highest.position)
    return message.reply(`🛑 You Cannot Ban Semeone With An Equal Higher Role!`)
    if(!member.bannable)
    return message.reply(`🛑Provided Member Is Not Bannable!`);
    let reason = args.slice(1).join(' ');
    if(!reason) reason = '`None`';
    if(reason.lenght > 1024) reason = reason.slice(0, 1021) + '...';
    await member.ban ({ reason: reason });
    const embed = new MessageEmbed()
    .setTitle('Ban Member!')
    .setDescription(`<:th:951655495377227846> ${member} Was Successfully Banned`)
    .addField('Reason', `${reason}`)
    .setFooter(message.member.displayName, message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setColor('#F871A0');
    message.reply({ embeds: [embed] })
  }
}