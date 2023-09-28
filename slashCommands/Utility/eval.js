module.exports = {
    name: 'eval',
    aliases: ['e', 'evaluate'],
    description: 'Evaluate Code',
    options: [
        {
            name: "code",
            description: "the code to evaluate",
            type: 3,
            required: true,
        }
    ],
    async execute(client, interaction, options) {
        if (interaction.member.id !== "775236227141599285") return; // DON'T REMOVE THIS LINE
        

        try {
            let code = interaction.options.getString("code")
            let time = Date.now()
            let res = require('util').inspect(await eval(code, { depth: 0 }));
            let time2 = Date.now()
            if (res.length > 1000) {
                let src = await require('sourcebin').create([{ content: res, language: 'javascript' }], { title: 'Eval', description: interaction.options.getString("code") })
                return interaction.reply(`Evaluated in \`${time2 - time}ms\`\n<${src.url}>`).catch(console.log)
            }
            return interaction.reply(`Evaluated in \`${time2 - time}ms\`\n\`\`\`js\n${res}\`\`\``).catch(console.log)
        } catch (e) {
            return interaction.reply(`\`\`\`${e}\`\`\``).catch(console.log)
        }
    }
}