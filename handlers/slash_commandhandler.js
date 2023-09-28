const { glob } = require("glob")
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports = async (client)  => {
    const slashCommands = await globPromise(`${process.cwd()}/slashCommands/*/*.js`) // Have a folder  => "<your main file>/src/SlashCommands" 
    const arrayOfSlashCommand = []
   
    slashCommands.map((value) => {
        const file = require(value)
        if(!file?.name) return;
        client.slash_commands.set(file.name, file)
        arrayOfSlashCommand.push(file)
    })
    
    client.on("ready", async () => {
       await client.application.commands.set(arrayOfSlashCommand)
    })
}