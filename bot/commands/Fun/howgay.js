const Discord = require("discord.js");

module.exports = {
  name: "howgay",
  cooldown: 2,
  usage: "?howgay @<user>",
  description: "Just for fun command",
   execute(client, message, args) {
    const mention = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
        if (!mention) return message.reply(`who do u want to check?`)
    

    const rng = Math.floor(Math.random() * 101);
    

    const howgayembed = new Discord.MessageEmbed()
      .setTitle(`Gay Machine Calculator`)
      .setDescription(`${mention} is ` + rng + "% Gay🌈")
      .setColor("LUMINOUS_VIVID_PINK")

    message.reply({ embeds: [howgayembed]})
  },
};