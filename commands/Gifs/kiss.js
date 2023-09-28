const API = require('anime-images-api')
const images_api = new API() 
module.exports = {
name: "kiss",
description: "kiss someone",
async execute(client, message) {
        const user = message.mentions.users.first()
        if(!user) {
message.reply("Please provide the user u wanna kiss!")
        return;}
        images_api.sfw.kiss().then(response => {
            message.channel.send(`${message.author} what are u doing!?`)
            message.channel.send(response.image)
        }) 
}
}