const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'ban',
  description: 'Ban A User',
  usage: 'ban <user> <reason>',
  permissions: 'BAN_MEMBERS',
  options: [
    {
      name: "user",
      description: "the user u wanna ban",
      type: 9,
      required: true,
    },
    {
      name: "reason",
      description: "the reason  to ban that user",
      type: 3,
      required: false,
    }
  ],
  execute: async (client, interaction, options) => {
    const member = interaction.options.getMentionable("user")
    if(!member)
    return interaction.reply(`🛑 Please Mention A Valid User Or Provide Valid User ID!`)
    if(member === interaction.member)
    return interaction.reply(`🛑 Cannot Ban Yourself!`)
    if(member.roles.highest.position >= interaction.member.roles.highest.position)
    return interaction.reply(`🛑 You Cannot Ban Semeone With An Equal Higher Role!`)
    if(!member.bannable)
    return interaction.reply(`🛑Provided Member Is Not Bannable!`);
    let reason = interaction.options.getString("reason")
    if(!reason) reason = '`None`';
    if(reason.lenght > 1024) reason = reason.slice(0, 1021) + '...';
    await member.ban ({ reason: reason });
    const embed = new MessageEmbed()
    .setTitle('Ban Member!')
    .setDescription(`<:th:951655495377227846> ${member} Was Successfully Banned`)
    .addField('Reason', `${reason}`)
    .setFooter(interaction.member.displayName, interaction.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setColor('#F871A0');
    interaction.reply({ embeds: [embed] })
  }
}