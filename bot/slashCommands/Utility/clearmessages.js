module.exports = {
    name: "clear",
    cooldown: 15,
    permissions: "MANAGE_MESSAGES",
    description: "clears messages",
    usage: "?clear <amount-of-messages>",
    options: [
        {
            name: "amount",
            description: "the amount of messages u wanna clear",
            type: 4,
            required: true,
        }
    ],
    async execute(client, interaction, options) {
        if(isNaN(interaction.options.getInteger("amount"))) return interaction.reply("pls enter a real number!");

        if(interaction.options.getInteger("amount") > 100) return interaction.reply("u cant delete more than 100 messages!");
        if(interaction.options.getInteger("amount") < 1) return interaction.reply("u must delete at least one message!");

        await interaction.channel.messages.fetch({limit: interaction.options.getInteger("amount")}).then(messages =>{
            interaction.channel.bulkDelete(messages);
        });
    }
}