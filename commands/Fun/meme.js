const axios = require("axios")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "meme",
    description: "get a meme from reddit",
    category: "Fun",
    
    async execute(client, message, args) {
        let res = await axios.default.get(
        `https://www.reddit.com/r/memes/random/.json`
        );
        if (!res || !res.data || !res.data.length)
            return message.reply("an error occured, try this command again later")
        res = res.data[0].data.children[0].data;
        const embed = new MessageEmbed()
        .setTitle(res.title)
        .setImage(res.url)
        .setColor("RANDOM")
        .setURL(`https://www.reddit.com${res.permalink}`)
        .setFooter(`👍🏻 ${res.ups} 💭 ${res.num_comments}`);
        message.channel.send({ embeds: [embed]});
    }
}