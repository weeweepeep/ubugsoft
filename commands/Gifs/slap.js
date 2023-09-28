const API = require('anime-images-api')
const images_api = new API() 
module.exports = {
name: "slap",
description: "slap someone",
async execute(client, message) {
       const user = message.mentions.users.first()
       if(!user) {
message.reply("Please provide the user u wanna slap!")
        return;}
        images_api.sfw.slap().then(response => {
            message.channel.send(`${message.author} slapped ${user}!`)
            message.channel.send(response.image)
        }) 
}
}