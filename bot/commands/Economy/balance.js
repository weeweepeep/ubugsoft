const { MessageEmbed } = require("discord.js")  
const profileModel = require("../../models/profileSchema")

module.exports = {
  name: "balance",
  cooldown: 5,
  description: "check a user or ur balance",
  category: "Economy",
  aliases: ["bal", "bl", "cash", "wallet"],
  permissions: [],
  usage: "?bal @<user>(optional)",
  description: "Check the user balance",
  async execute(client, message, args, discord, cmd, profileData) {
    const target = message.mentions.users.first() || message.author
    const user = await profileModel.findOne({userID: target.id})

    const embed = new MessageEmbed()
    .setDescription(`cash: :money_with_wings: **${user.coins}** \n bank: :money_with_wings: **${user.bank}**`)
    .setColor("AQUA")
    message.reply({ embeds: [embed]})
  },
};