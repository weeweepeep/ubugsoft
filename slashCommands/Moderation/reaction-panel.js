const Schema = require("../../models/reaction-roles")
const Discord = require('discord.js')

module.exports = {
    name: "reaction-panel",
    description: "Shows the reaction role panel",
    permissions: "ADMINISTRATOR",
    category: "Moderation",
    usage: "?reaction-panel",
    options: [
        {
            name: "channel",
            description: "the channel to send the reaction-panel",
            type: 7,
            required: false,
        }
    ],

    async execute(client, interaction) {

        const channel = interaction.options.getChannel(channel) || interaction.channel

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {

            if (!data) return interaction.reply("No reaction role data can be found!")

            const mapped = Object.keys(data.Roles).map((value, index) => {

                const role = interaction.guild.roles.cache.get(data.Roles[value][0])

                return `\`${index + 1}.\` ${data.Roles[value][1].raw} -React to get: ${role}`

            }).join("\n\n")

            const rrEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("REACTION ROLES")
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setDescription("React with the emojis below to assign yourself to a role!")
                .addField("\u200B", mapped)
                .setTimestamp()

            channel.send({ embeds: [rrEmbed] }).then((msg) => {

                data.interaction = msg.id
                data.save()

                const reactions = Object.values(data.Roles).map((val) => val[1].id)

                reactions.map(
                    (emoji) => msg.react(emoji)
                        .catch(error => {

                            interaction.reply("You must use emojis from this server to make it work!")
                            console.error(error)

                        })
                )

            })

        })
    }
}