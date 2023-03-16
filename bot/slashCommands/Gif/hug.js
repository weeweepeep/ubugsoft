const gif = require("image-cord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "hug",
    cooldown: 3,
    description: "hug someone",
    usage: "/hug @<user>",
    options: [
        {
            name: "user",
            description: "the user to hug",
            type: "USER",
            required: true,
        }
    ],

    async execute(client, interaction, options) {
        const target = interaction.options.getUser("user")
        const image = await gif.Hug()
        const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setImage(`${image}`)
        .setDescription(`${interaction.user} just hugged ${target}!`)

        interaction.reply({ embeds: [embed]})
    }
}