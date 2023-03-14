const Discord = require('discord.js');
require('dotenv').config();
const client =  new Discord.Client({ intents: 32767,
    partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const mongoose = require("mongoose")



module.exports = client
client.commands = new Discord.Collection();
client.event = new Discord.Collection();
client.slash_commands = new Discord.Collection();


mongoose.set('useCreateIndex', true);


['command_handler', 'event_handler', 'mongo_handler'].forEach((handler) =>{
    require(`./handlers/${handler}`) (client, Discord);
});
   
require("./handlers/slash_commandhandler") (client)



client.login(process.env.TOKEN);