const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: 'weather',
    aliases: ['wthr'],
    category: "Information",
    description: "checks the weather for different countries",
    usage: "?weather <country>",
    cooldown: 7,
    options: [
        {
            name: "country",
            description: "the place u wanna search",
            type: 3,
            required: true
        }
    ],
    async execute(client, interaction, options) {
    
        weather.find({search: interaction.options.getString("country"), degreeType: 'C'}, function (error, result){
        // 'C' can be changed to 'F' for farneheit results
        if(error) return interaction.reply(error);

        if(result === undefined || result.length === 0) return interaction.reply('**Invalid** location');

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


        interaction.reply({embeds: [embed]})
        })        
    }
}
