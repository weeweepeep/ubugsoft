const { MessageEmbed } = require("discord.js")  
const profileModel = require("../../models/profileSchema")

module.exports = {
  name: "balance",
  category: "Economy",
  aliases: ["bal", "bl", "cash", "wallet"],
  cooldown: 5,
  description: "Check the user balance",
  options: [
    {
      name: "user",
      description: "the user u wanna check their balance",
      type: "USER",
      required: false
    }
  ],
  async execute(client, interaction, options,  Discord, profileData) {
    const target = interaction.options.getUser("user") || interaction.user
    const user = await profileModel.findOne({ userID: target.id })
    if(!user) return interaction.reply("🛑 Failed to check that user!")
    const embed = new MessageEmbed()
    .setDescription(`cash: :money_with_wings: **${user.coins}** \n bank: :money_with_wings: **${user.bank}**`)
    .setColor("AQUA")
    interaction.reply({ embeds: [embed]})
  },
};