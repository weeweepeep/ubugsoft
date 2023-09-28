const { MessageEmbed } = require("discord.js")  

module.exports = {
  name: "balance",
  category: "Economy",
  aliases: ["bal", "bl", "cash", "wallet"],
    cooldown: 5,
  permissions: [],
  description: "Check the user balance",
  execute(client, message, args, discord, cmd, profileData) {
    const embed = new MessageEmbed()
    .setDescription(`cash: :money_with_wings: **${profileData.coins}** \n bank: :money_with_wings: **${profileData.bank}**`)
    .setColor("AQUA")
    message.reply({ embeds: [embed]})
  },
};