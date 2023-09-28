const { MessageEmbed } = require("discord.js")
const client = require("../index")

client.on("guildMemberAdd", async (member, message, guild) => {
  
    
    
  const WelcomeChannel = member.guild.channels.cache.find(c => c.name === "welcome")
  if(!WelcomeChannel) return;
  const servericon = member.guild.iconURL({ dynamic: true })
  const membercount = member.guild.memberCount
  const { user } = member;
  const embed = new MessageEmbed()
  .setColor("PURPLE")
  .setTitle(`${member.user.username} Welome to ${member.guild.name}!`)
  .setDescription(`MemberCount of the server: \`${membercount}\`\n AccountCreated: <t:${parseInt(user.createdTimestamp / 1000)}:R>`)
  .setImage(servericon)
  WelcomeChannel.send({ embeds: [embed]})

  const addrole = member.guild.roles.cache.find(r => r.name === 'newcomer')
   if(!addrole) {
      guild.roles.create({
  data: {
    name: 'newcomer',
    color: '#f44546',
  }
  })
   }
  
  member.roles.add(addrole)
  
  const profileModel = require("../models/profileSchema");

module.exports = async (client, discord, member) => {
  let profile = await profileModel.create({
    userID: member.id,
    serverID: member.guild.id,
    coins: 1000,
    bank: 0,
  });
  profile.save();
};
    
          

})