module.exports = {
    name: 'eval',
    aliases: ['e', 'evaluate'],
    description: 'Evaluate Code',
    async execute(client, message, args, Discord) {
        if (message.member.id !== "775236227141599285") return; // DON'T REMOVE THIS LINE
        
        if (!args[0]) return message.reply('I Evaluated **nothing**'); // Handles empty codes

        try {
            let code = args.join(' ');
            let time = Date.now()
            let res = require('util').inspect(await eval(code, { depth: 0 }));
            let time2 = Date.now()
            if (res.length > 1000) {
                let src = await require('sourcebin').create([{ content: res, language: 'javascript' }], { title: 'Eval', description: args.join(' ') })
                return message.reply(`Evaluated in \`${time2 - time}ms\`\n<${src.url}>`).catch(console.log)
            }
            return message.reply(`Evaluated in \`${time2 - time}ms\`\n\`\`\`js\n${res}\`\`\``).catch(console.log)
        } catch (e) {
            return message.reply(`\`\`\`${e}\`\`\``).catch(console.log)
        }
    }
}