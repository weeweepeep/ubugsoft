module.exports = {
    name: "pull",
    description: "pull a member to ur voice channel",
    permissions: ["ADMINISTRATOR"],
    category: "Music",
    usage: "?pull @<user>",

    async execute(client, message, args) {
        const member = message.mentions.members.first();
        if(!member) return message.reply("Please mention a member in the server!");
        if(!member.voice.channel) {
            return message.reply("The member u mentioned isnt in a voice channel!");

        }

        if(!message.member.voice.channel)
        return message.reply("please join a voice channel first!");
        member.voice.setChannel(message.member.voice.channel);
        message.reply("pulled member to ur voice channel!")
    }
}