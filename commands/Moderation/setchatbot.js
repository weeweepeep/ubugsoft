const schema = require("../../models/chatbot")

module.exports = {
    name: "setchatbot",
    description: "set the channel fot the chat bot",
    permissions: ["ADMINISTRATOR"],
    cooldown: 15,
    
    async execute(client, message, args, Discord) {
        const channell = message.mentions.channels.first()
        if(!channell) {
            return message.reply("Please provide a channel to set the chat bot!")
        }
        
        schema.findOne({
            guild: message.guild.id
        }, async (err, data) => {
            if(data) data.delete()
            new schema({
                guild: message.guild.id,
                channel: channell.id
            }).save();
            message.reply(`Chat-bot channel set as ${channell}!`)
        })
    }
}
