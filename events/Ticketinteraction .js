const simplydjs = require("simply-djs")
const client = require("../index")
client.on("interactionCreate", interaction => {
    try {
    simplydjs.clickBtn(interaction)
    } catch (err) {
        console.log("hi")
    }
})