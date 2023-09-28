const API = require('anime-images-api')
const images_api = new API() 
module.exports = {
name: "hentai",
description: "see hentai image of gif",
async execute(client, message) {
        images_api.nsfw.hentai().then(response => {
            message.channel.send(response.image)
        }) 
}
}