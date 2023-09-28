const API = require('anime-images-api')
const images_api = new API() 
module.exports = {
name: "lesbian",
aliases: ["les"],
description: "see some lesbian stuff",
async execute(client, interaction) {
        images_api.nsfw.lesbian().then(response => {
            interaction.reply(response.image)
        }) 
}
}