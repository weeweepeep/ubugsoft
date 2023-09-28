const API = require('anime-images-api')
const images_api = new API() 
module.exports = {
name: "punch",
description: "punch someone",
async execute(message) {
    const user = message.mentions.users.first()
        if(!user) {
message.reply("Please provide the user u wanna punch!")
        return;}
    images_api.sfw.punch().then(response => {
            message.channel.send(`${message.author} punched ${user}!`)
            message.channel.send(response.image)
        }) 
}
}