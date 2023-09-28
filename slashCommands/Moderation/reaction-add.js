const { Util } = require("discord.js")
const Schema = require("../../models/reaction-roles")

module.exports = {
    name: "reaction-add",
    category: "Moderation",
    description: "Adds a new reaction role to the reaction role panel",
    permissions: "ADMINISTRATOR",
    usage: "?reaction-add @<role> <emoji>",
    options: [
        {
            name: "role",
            description: "the role to add to the reaction panel",
            type: 9,
            required: true,
        },
        {
            name: "emoji",
            description: "a custom emoji from the server",
            type: 3,
            required: true,
        }
    ],

    async execute(client, interaction, args) {


        const role = interaction.options.getMentionable("role")

        if (!role) return interaction.reply("The role you provided is not valid in this server!")

        let [, emoji] = interaction.options.getString("emoji")

        if (!emoji) return interaction.reply("Please mention a emoji first!")

        const parsedEmoji = Util.parseEmoji(emoji)

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {

            if (data) {

                data.Roles[parsedEmoji.name] = [
                    role.id,
                    {
                        id: parsedEmoji.id,
                        raw: emoji
                    }
                ]

                await Schema.findOneAndUpdate({ Guild: interaction.guild.id }, data)

            } else {

                new Schema({

                    Guild: interaction.guild.id,
                    message: 0,
                    Roles: {

                        [parsedEmoji.name]: [
                            role.id,
                            {
                                id: parsedEmoji.id,
                                raw: emoji
                            }
                        ]

                    }

                }).save()

            }

            interaction.reply("A new role has been added to the reaction role panel")

        })

    }
}