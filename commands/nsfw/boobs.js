const API = require('anime-images-api')
const images_api = new API() 
module.exports = {
name: "boobs",
description: "see some breasts",
async execute(client, message) {
        images_api.nsfw.boobs().then(response => {
            message.channel.send(response.image)
        }) 
}
}