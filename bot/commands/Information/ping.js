module.exports = {
    name: 'ping',
    aliases: [],
    category: "Information",
    description: "bot's ping",
    usage: "?ping",
    execute(client, message, args, Discord){
        message.reply('**ping:**'+client.ws.ping+ 'ms');
    }
}