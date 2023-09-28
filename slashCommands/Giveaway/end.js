module.exports = {
    name: "giveawayend",
    description: "end a giveaway",
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
        client.giveawaysManager.end(messageId).then(() => {
            interaction.channel.send('Success! Giveaway ended!');
        }).catch((err) => {
            interaction.channel.send(`An error has occurred, please check and try again.\n\`${err}\``);
        });
    }

}