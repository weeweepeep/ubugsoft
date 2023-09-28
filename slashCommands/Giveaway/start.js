const ms = require("ms")

module.exports = {
    name: "giveawaystart",
    description: "start a giveaway",
    options: [
        {
            name: "duration",
            description: "the duration of the giveaway",
            type: "STRING",
            required: true,
        },
        {
            name: "winners",
            description: "amount of winners",
            type: "INTEGER",
            required: true,
        },
        {
            name: "prize",
            description: "the prize of the giveaway",
            type: "STRING",
            required: true
        },
        {
            name: "channel",
            description: "the channel to send the giveaway",
            type: "CHANNEL",
            required: false,

        }
    ],
    async execute(client, interaction, options) {

        const duration = interaction.options.getString('duration');
        const winnerCount = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');
        const channell = interaction.options.getChannel("channel") || interaction.channel

        client.giveawaysManager.start(channell, {
            duration: ms(duration),
            winnerCount,
            prize
        }).then((gData) => {
            console.log(gData); // {...} (messageId, end date and more)
        });

    }

}