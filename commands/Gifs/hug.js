const API = require('anime-images-api')
const images_api = new API() 
module.exports = {
name: "hug",
description: "hug someone",
async execute(client, message) {
       const user = message.mentions.users.first()
       if(!user) {
message.reply("Please provide the user u wanna hug!")
       return;
       }
        images_api.sfw.hug().then(response => {
            message.channel.send(`${message.author} hugged ${user}!`)
            message.channel.send(response.image)
        }) 
}
}