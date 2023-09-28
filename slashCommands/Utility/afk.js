const db = require("quick.db");


module.exports = {
    name: "afk",
    aliases: ["afkset"],
    description: "set ur status to afk",
    options: [
        {
            name: "reason",
            description: "the reason to be afk",
            type: 3,
            required: false
        }
    ],
    async execute(client, interaction, options) {
    try {
    let reason = interaction.options.getString("reason")
    if(db.fetch(`afk.${interaction.user.id}.${interaction.guild.id}`)) return interaction.reply("You are already afk!")
    if(!reason) reason = "N/A"
    if(reason.length >= 128) return interaction.reply("Your reason is more than 128 letters!")

    let username = interaction.member.nickname ? interaction.member.nickname : interaction.user.username;

    db.set(`afk.${interaction.user.id}.${interaction.guild.id}`,{reason:reason,date:Date.now(),name: username})
    interaction.reply("Your status has been set to **afk**")
    if(interaction.guild.members.cache.get(client.user.id).roles.highest.position > interaction.member.roles.highest.position){
    interaction.member.setNickname(`[AFK]: ${username}`).catch(e => console.log(e))
    }
    }catch(err) {
        interaction.reply("Sorry but i cant set the status for you!")
    }
}
}