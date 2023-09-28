const API = require('anime-images-api')
const images_api = new API() 
module.exports = {
name: "boobs",
description: "see some breasts",
async execute(client, interaction) {
        images_api.nsfw.boobs().then(response => {
            interaction.reply(response.image)
        }) 
}
}