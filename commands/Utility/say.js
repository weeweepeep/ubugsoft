module.exports = {
name: "say",
description: "say something",

async execute(client, message, args, Discord) {
const content = args.slice(0).join(" ")
if(!content) {
message.reply("Please provide sth for me to say!")
} else {
message.channel.send(`${content}`)
}
}
}