const { Perms } = require("./../validation/permissions")
const { Client } = require("discord.js")
const { promisify } = require("util")
const { glob } = require("glob")
const PG = promisify(glob)
const Ascii = require("ascii-table")


/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {
    const Table = new Ascii("Prefix_Commands loaded")

    CommandsArray = [];

    (await PG(`${process.cwd()}/commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
        return Table.addRow(file.split("/")[7], "❌ FAILED", "Missing a name")

        if(!command.description)
        return Table.addRow(file.split("/")[7], "❌ FAILED", "Missing a description")

        if(!command.usage)
        return Table.addRow(file.split("/")[7], "❌ FAILED", "Missing a usage") 

        

        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "✅ SUCCESSFUL")
        });

        console.log(Table.toString());

        
}