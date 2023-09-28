module.exports = {
    name: "giveawaydelete",
    description: "delete a giveaway",
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
        client.giveawaysManager.delete(messageId).then(() => {
            interaction.channel.send('Success! Giveaway deleted!');
        }).catch((err) => {
            interaction.channel.send(`An error has occurred, please check and try again.\n\`${err}\``);
        });
    }

}