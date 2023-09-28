const profileModel = require("../../models/profileSchema");
const ms = require("parse-ms")


module.exports = {
    name: "daily",
    category: "Economy",
    description: "claim daily reward",
    cooldown: 86400,

    async execute(client, message, args) {
        let randomAmount = Math.floor(Math.random() * 4000) + 1000

        
       message.reply(`${message.author.username} u claimed ur daily reward of :money_with_wings:**${randomAmount}** of cash!`)
        await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        coins: randomAmount,
                    },
                }
            );
        }}
        
   
