const db = require('quick.db')
const fetch = require('node-fetch')
const  client = require("../index")
const schema = require("../models/chatbot")

client.on("messageCreate", async (message) => {
    if(message.author.bot) return
    await schema.findOne({
        guild: message.guild.id
    }, async (err, data) => {
        if(!data) return
        if(err) throw err;
        const channell = data.channel
        
        
        if(message.channel.id === channell) {
            fetch(`
http://api.brainshop.ai/get?bid=165214&key=rPqXgNRjc3px2VZS&uid=1&msg=${encodeURIComponent(message)}`)
            .then(response => response.json())
            .then(data => {
                message.reply(`${data.cnt}`)
            })
        }
    })
})