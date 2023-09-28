const API = require('anime-images-api')
const images_api = new API() 
module.exports = {
name: "hentai",
description: "see hentai gifs or images",
async execute(client, interaction) {
        images_api.nsfw.hentai().then(response => {
            interaction.reply(response.image)
        }) 
}
}