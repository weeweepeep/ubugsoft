module.exports = {
    name: 'ping',
    aliases: [],
    category: "Information",
    description: "bot's ping",
    execute(client, interaction){
        interaction.reply('**ping:**'+client.ws.ping+ 'ms');
    }
}