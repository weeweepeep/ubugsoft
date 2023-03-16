const Discord = require("discord.js");

module.exports = {
  name: "howgay",
  cooldown: 2,
  description: "check how gay a user is",
  usage: "/howgay <user>",
  options: [
    {
      name: "user",
      description: "the user u want to check for gayness",
      type: "USER",
      required : true,
    }
  ],
   execute(client, interaction, options) {
    const mention = interaction.options.getUser("user") || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
        if (!mention) return message.reply(`who do u want to check?`)
    

    const rng = Math.floor(Math.random() * 101);
    

    const howgayembed = new Discord.MessageEmbed()
      .setTitle(`Gay Machine Calculator`)
      .setDescription(`${mention} is ` + rng + "% Gay🌈")
      .setColor("LUMINOUS_VIVID_PINK")

    interaction.reply({ embeds: [howgayembed]})
  },
};