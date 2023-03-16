const { Interaction, MessageEmbed } = require("discord.js")
const { Configuration, OpenAIApi } = require("openai")
require("dotenv").config()

const configuration = new Configuration({
    apiKey: process.env.apiKey
})

const openai = new OpenAIApi(configuration)

module.exports = {
    name: "chatgpt",
    description: "ask chatgbt a question",
    usage: "/chatgbt",
    options: [
        {
            name: "question",
            description: "question to ask chatgbt",
            type: "STRING",
            required: true
        }
    ],

    /**
     * 
     * @param {*} client 
     * @param {Interaction} interaction 
     * @param {*} options 
     */
    async execute(client, interaction, options) {

        const question = interaction.options.getString("question")

        try {
            const res = await openai.createCompletion({
                model: "text-davinci-003",
                max_tokens: 4096,
                temperature: 0.5,
                prompt: question
            })
            const embed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)

            await interaction.reply({ embeds: [embed] })
          } catch(e) {
            console.log(e)
          }
    }

}
