const db = require("quick.db");


module.exports = {
    name: "afk",
    aliases: ["afkset"],
    description: "set ur status to afk",
    async execute(client,message,args) {
    try {
    let reason = args.slice(0).join(" ")
    if(db.fetch(`afk.${message.author.id}.${message.guild.id}`)) return message.channel.send("You are already afk!")
    if(!reason) reason = "N/A"
    if(reason.length >= 128) return message.reply("Your reason is more than 128 letters!")

    let username = message.member.nickname ? message.member.nickname : message.author.username;

    db.set(`afk.${message.author.id}.${message.guild.id}`,{reason:reason,date:Date.now(),name: username})
    message.reply("Your status has been set to **afk**")
    if(message.guild.members.cache.get(client.user.id).roles.highest.position > message.member.roles.highest.position){
    message.member.setNickname(`[AFK]: ${username}`).catch(e => console.log(e))
    }
    }catch(err) {
        message.channel.send("Sorry but i cant set the status for you!")
    }
}
}