module.exports = {
    name: "giveawayresume",
    description: "resume a giveaway",
    options: [
        {
            name: "message_id",
            description: "the messageID of the giveaway",
            type: "STRING",
            required: true,
        }
    ],
    async execute(client, interaction, options) {
        const messageId = interaction.options.getString('message_id');
        client.giveawaysManager.unpause(messageId).then(() => {
            interaction.channel.send('Success! Giveaway unpaused!');
        }).catch((err) => {
            interaction.channel.send(`An error has occurred, please check and try again.\n\`${err}\``);
        });
    }

}