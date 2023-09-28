const API = require('anime-images-api')
const images_api = new API() 
module.exports = {
name: "lesbian",
aliases: ["les"],
description: "see les image of gif",
async execute(client, message) {
        images_api.nsfw.lesbian().then(response => {
            message.channel.send(response.image)
        }) 
}
}