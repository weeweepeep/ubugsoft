const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: 'weather',
    aliases: ['wthr'],
    category: "Information",
    description: "checks the weather for different countries",
    usage: "?weather <country>",
    cooldown: 7,
    async execute(client, message, args) {
    
        weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
        // 'C' can be changed to 'F' for farneheit results
        if(error) return message.reply(error);
        if(!args[0]) return message.reply('Please specify a location')

        if(result === undefined || result.length === 0) return message.reply('**Invalid** location');

        var current = result[0].current;
        var location = result[0].location;

        const embed = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Weather forecast for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor(0x111111)
        .addField('Timezone', `UTC${location.timezone}`, true)
        .addField('Degree Type', 'Celsius', true)
        .addField('Temperature', `${current.temperature}°`, true)
        .addField('Wind', current.winddisplay, true)
        .addField('Feels like', `${current.feelslike}°`, true)
        .addField('Humidity', `${current.humidity}%`, true)


        message.reply({embeds: [embed]})
        })        
    }
}
