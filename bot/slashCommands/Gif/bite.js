const gif = require("image-cord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "bite",
    cooldown: 3,
    description: "bite someone",
    usage: "/bite @<user>",
    options: [
        {
            name: "user",
            description: "the user to bite",
            type: "USER",
            required: true,
        }
    ],

    async execute(client, interaction, options) {
        const target = interaction.options.getUser("user")
        if(!target) return interaction.reply("**please provide a user to bite**")
        const image = await gif.Bite()
        const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setImage(`${image}`)
        .setDescription(`${interaction.user} just bit ${target}!`)

        interaction.reply({ embeds: [embed]})
    }
}