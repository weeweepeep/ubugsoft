const schema = require("../../models/chatbot")

module.exports = {
    name: "setchatbot",
    description: "set the channel fot the chat bot",
    permissions: "ADMINISTRATOR",
    cooldown: 15,
    options: [
        {
            name: "channel",
            description: "the channel for chat bot",
            type: 7,
            required: true,
        }
    ],
    
    async execute(client, interaction, args, Discord) {
        const channell = interaction.options.getChannel("channel")
        if(!channell) {
            return interaction.reply("Please provide a channel to set the chat bot!")
        }
        
        schema.findOne({
            guild: interaction.guild.id
        }, async (err, data) => {
            if(data) data.delete()
            new schema({
                guild: interaction.guild.id,
                channel: channell.id
            }).save();
            interaction.reply(`Chat-bot channel set as ${channell}!`)
        })
    }
}
