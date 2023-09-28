const profileModel = require("../../models/profileSchema");
const ms = require("parse-ms")


module.exports = {
    name: "daily",
    category: "Economy",
    description: "claim daily reward",
    cooldown: 86400,

    async execute(client, interaction, options) {
        let randomAmount = Math.floor(Math.random() * 4000) + 1000

        
       interaction.reply(`${interaction.user.username} u claimed ur daily reward of :money_with_wings:**${randomAmount}** of cash!`)
        await profileModel.findOneAndUpdate(
                {
                    userID: interaction.user.id,
                },
                {
                    $inc: {
                        coins: randomAmount,
                    },
                }
            );
        }}
        
   
