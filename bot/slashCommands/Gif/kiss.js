const gif = require("image-cord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "kiss",
    cooldown: 3,
    description: "kiss someone",
    usage: "/kiss @<user>",
    options: [
        {
            name: "user",
            description: "the user to kiss",
            type: "USER",
            required: true,
        }
    ],

    async execute(client, interaction, options) {
        const target = interaction.options.getUser("user")
        const image = await gif.Kiss()
        const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setImage(`${image}`)
        .setDescription(`${interaction.user} just kissed ${target}!`)

        interaction.reply({ embeds: [embed]})
    }
}