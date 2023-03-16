const { Interaction, MessageEmbed } = require("discord.js")
const { Configuration, OpenAIApi } = require("openai")
require("dotenv").config()

const configuration = new Configuration({
    apiKey: process.env.apiKey
})

const openai = new OpenAIApi(configuration)

module.exports = {
    name: "chatgpt",
    aliases: ["gpt"],
    description: "ask chatgbt a question",
    usage: "?chatgbt",

    /**
     * 
     * @param {*} client 
     * @param {Interaction} interaction 
     * @param {*} options 
     */
    async execute(client, message, args) {

        const question = args.slice(0).join(" ")
        if(!question) return message.reply("provide a question to ask chatgbt!")

        try {
            const res = await openai.createCompletion({
                model: "text-davinci-003",
                max_tokens: 2048,
                temperature: 0.5,
                prompt: question
            })
            const embed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)

            await message.reply({ embeds: [embed] })
          } catch(e) {
            console.log(e)
          }
    }

}
