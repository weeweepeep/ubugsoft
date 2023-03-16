const gif = require("image-cord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "lick",
    cooldown: 3,
    description: "lick someone",
    usage: "/lick @<user>",
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
        const image = await gif.Lick()
        const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setImage(`${image}`)
        .setDescription(`${interaction.user} just licked ${target}!`)

        interaction.reply({ embeds: [embed]})
    }
}