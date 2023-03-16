const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "avatar",
  aliases: ["pfp"],
  description: "search a user or your profile pic",
  usage: "/avatar <user>",
  options: [
    {
      name: "user",
      description: "the user to search",
      type: "USER",
      required: true,
    }
  ],

  async execute(client, interaction, options) {
    const user = interaction.options.getUser("user")

    const embed = new MessageEmbed()
    .setTitle(`${user.username}'s Avatar`)
    .setColor("DARK_PURPLE")
    .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
    .setDescription(`[Png](${user.avatarURL({ format: 'png' })}) | [Webp](${user.avatarURL({ dynamic: true })}) | [Jpg](${user.avatarURL({ format: 'jpg' })})`)
    .setFooter(`requested by ${interaction.user.username}`)

    interaction.reply({ embeds: [embed] })
  }
}