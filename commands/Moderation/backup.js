const backup = require("discord-backup")
backup.setStorageFolder(__dirname + "/backups/")

module.exports = {
    name: "backup",
    category: "Moderation",
    description: "Checks, Creates or Restores a backup server",
    aliases: ["bkp"],
    usage: "?bkp create / infos / load / delete",
    permissions: ["ADMINISTRATOR"],
    cooldown: 5,

    async execute(client, message, args, Discord, cmd) {

        if (message.author.id !== message.guild.ownerId) return message.reply("Only a owner can use this command!")

        const actions = ["create", "load", "infos", "delete"]

        if (!actions.includes(args[0])) return message.reply("You can only choose among `create` / `load` / `infos` / `delete`")

        if (args[0] === "create") {

            backup.create(message.guild, {

                jsonBeautify: true

            }).then(async backupdata => {

                const Embed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("Backup Successful")
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setDescription(`Backup has successfully been create. Use \`backup load ${backupdata.id}\` to load the backup, or use \`backup delete ${backupdata.id}\` to delete the data.`)
                    .setFooter("go to my support server and ask the owner if u forget ur backup id")
                    .setTimestamp()

                message.reply({ embeds: [Embed] })

            })

        }

        if (args[0] === "load") {

            const backupID = args[1]

            if (!backupID) return message.reply("Please provide a backup ID")

            backup.fetch(backupID).then(async () => {

                backup.load(backupID, message.guild).then(() => {

                    clearGuildBeforeRestore: true,

                        backup.remove(backupID)

                })

            }).catch(err => {

                message.reply("No backup was found with that ID!")

            })

        }

        if (args[0] === "infos") {

            const backupID = args[1]

            if (!backupID) return message.reply("Please provide a backup ID")

            backup.fetch(backupID).then((backupInfos) => {

                const date = new Date(backupInfos.data.createdTimestamp)
                const yyyy = date.getFullYear().toString(), mm = (date.getMonth() + 1).toString(), dd = date.getDate().toString()
                const formatedDate = `${yyyy}/${(mm[1] ? mm : "0" + mm[0])}/${(dd[1] ? dd : "0" + dd[0])}`

                let embed = new Discord.MessageEmbed()
                    .setAuthor("Backup Informations")
                    .addField("Backup ID", backupInfos.id, false)
                    .addField("Server ID", backupInfos.data.guildID, false)
                    .addField("Size", `${backupInfos.size} kb`, false)
                    .addField("Created at", formatedDate, false)
                    .setColor("AQUA")

                message.reply({ embeds: [embed] })

            }).catch((err) => {

                return message.channel.send("No backup was found with that ID!")

            })

        }

        if (args[0] === "delete") {

            const backupID = args[1]

            if (!backupID) return message.reply("Please provide a backup ID")

            backup.remove(backupID).then((backupInfos) => {

                message.reply("Backup data has successfully been deleted")

            }).catch((err) => {

                return message.channel.send("No backup was found with that ID!")

            })

        }

    }
}