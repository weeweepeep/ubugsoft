const API = require('anime-images-api')
const images_api = new API() 
module.exports = {
name: "cuddle",
description: "cuddle someone",
async execute(client, message) {
               const user = message.mentions.users.first()
               if(!user) {
message.reply("Please provide the user u wanna cuddle!")
               return;}
        images_api.sfw.cuddle().then(response => {
            message.channel.send(`${message.author} is cuddling ${user}!`)
            message.channel.send(response.image)
        }) 
}
}