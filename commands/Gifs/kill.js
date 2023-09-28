const API = require('anime-images-api')
const images_api = new API() 
module.exports = {
name: "kill",
description: "kill someone",
async execute(client, message) {
               const user = message.mentions.users.first()
               if(!user) {
    message.reply("Please provide the user u wanna kill!")
               return;}
        images_api.sfw.kill().then(response => {
            message.channel.send(`${message.author} killed ${user}!`)
            message.channel.send(response.image)
        }) 
}
}