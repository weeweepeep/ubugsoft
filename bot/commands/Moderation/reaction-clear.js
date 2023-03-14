const Schema = require("../../models/reaction-roles")

module.exports = {
    name: "reaction-clear",
    description: "Clears the reaction role data",
    permissions: ["ADMINISTRATOR"],
    usage: "?reaction-clear",
    category: "Moderation",

    async execute(client, message, cmd, args, Discord) {

        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {

            if (data) {

                await data.delete()

                message.reply("Data from the reaction role panel has been cleared!")

            } else if(message.author.id !== message.guild.ownerId){
            message.reply("u arent the owner of the server!")
        } else {
            
        

                message.reply("There's no data in the reaction role panel!")

        }

        })

    }}
