module.exports = {
    name: "clear",
    cooldown: 15,
    permissions: ["MANAGE_MESSAGES"],
    description: "clears messages",
    category: "Music",
    usage: "?clear <amount-of-messages>",
    async execute(client, message, args) {
        if(!args[0]) return message.reply("pls enter the amount of messages u wanna clear!");
        if(isNaN(args[0])) return message.reply("pls enter a real number!");

        if(args[0] > 100) return message.reply("u cant delete more than 100 messages!");
        if(args[0] < 1) return message.reply("u must delete at least one message!");

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);
        });
    }
}