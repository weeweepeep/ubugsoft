const { MessageEmbed } = require("discord.js")  

module.exports = {
  name: "balance",
  category: "Economy",
  aliases: ["bal", "bl", "cash", "wallet"],
    cooldown: 5,
  description: "Check the user balance",
  execute(client, interaction, options,  Discord, profileData) {
    const embed = new MessageEmbed()
    .setDescription(`cash: :money_with_wings: **${profileData.coins}** \n bank: :money_with_wings: **${profileData.bank}**`)
    .setColor("AQUA")
    interaction.reply({ embeds: [embed]})
  },
};