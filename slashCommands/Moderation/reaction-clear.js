const Schema = require("../../models/reaction-roles")

module.exports = {
    name: "reaction-clear",
    description: "Clears the reaction role data",
    permissions: "ADMINISTRATOR",
    usage: "?reaction-clear",
    category: "Moderation",

    async execute(client, interaction, cmd, args, Discord) {

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {

            if (data) {

                await data.delete()

                interaction.reply("Data from the reaction role panel has been cleared!")

            } else if(interaction.author.id !== interaction.guild.ownerId){
            interaction.reply("u arent the owner of the server!")
        } else {
            
        

                interaction.reply("There's no data in the reaction role panel!")

        }

        })

    }}
