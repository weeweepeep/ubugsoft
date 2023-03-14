const { Util } = require("discord.js")
const Schema = require("../../models/reaction-roles")

module.exports = {
    name: "reaction-add",
    category: "Moderation",
    description: "Adds a new reaction role to the reaction role panel",
    permissions: ["ADMINISTRATOR"],
    usage: "?reaction-add @<role> <emoji>",

    async execute(client, message, args) {

        if (!args[0]) return message.reply("Please mention a role first!")

        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])

        if (!role) return message.reply("The role you provided is not valid in this server!")

        let [, emoji] = args

        if (!emoji) return message.reply("Please mention a emoji first!")

        const parsedEmoji = Util.parseEmoji(emoji)

        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {

            if (data) {

                data.Roles[parsedEmoji.name] = [
                    role.id,
                    {
                        id: parsedEmoji.id,
                        raw: emoji
                    }
                ]

                await Schema.findOneAndUpdate({ Guild: message.guild.id }, data)

            } else {

                new Schema({

                    Guild: message.guild.id,
                    Message: 0,
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

            message.reply("A new role has been added to the reaction role panel")

        })

    }
}