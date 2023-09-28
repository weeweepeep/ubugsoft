const client = require("../index")
const db = require("quick.db")
require("dotenv").config()
const prefix = process.env.PREFIX
client.on("messageCreate", async (message, member) => {
    if(message.content.startsWith(prefix + "afk")) return;
    
    if(!db.fetch(`afk.${message.author.id}.${message.guild.id}`)) return;
    let username = message.member.nickname ? message.member.nickname : message.author.username;
    if(username !== message.author.username && username.startsWith("[AFK]")){
        message.member.setNickname(db.fetch(`afk.${message.author.id}.${message.guild.id}.name`))
    }
    
    db.delete(`afk.${message.author.id}.${message.guild.id}`)
    return message.reply(`your status has been set to **active**!`)
})