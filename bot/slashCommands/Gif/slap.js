const gif = require("image-cord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "slap",
    cooldown: 3,
    description: "slap someone",
    usage: "?slap @<user>",
    options: [
        {
            name: "user",
            description: "the user to slap",
            type: "USER",
            required: true,
        }
    ],

    async execute(client, interaction, options) {
        const target = interaction.options.getUser("user")
        const image = await gif.Slap()
        const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setImage(`${image}`)
        .setDescription(`${interaction.user} just slapped ${target}!`)

        interaction.reply({ embeds: [embed]})
    }
}