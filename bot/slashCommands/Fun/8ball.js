const { MessageEmbed } = require('discord.js');
module.exports = {
  name: '8ball',
  cooldown: 15 * 60,
    category: "Fun",
  description: 'Asks a question and let the bot determine your fate :sparkler:',
  usage: "/8ball <question>",
  options: [
    {
      name: "question",
      description: "the question u wanna ask the 8ball",
      type: 3,
      required: true,
    }
  ],
  async execute(client, interaction, options) {
    const replies = ['Yes.', 'No.', 'Never.', 'Definitely.', 'Ask again later.']; // random responses

    const result = Math.floor(Math.random() * replies.length); // Get a random respons for the array
    const question = interaction.options.getString("question")
    // check permissions for embed
    if (interaction.channel.permissionsFor(interaction.guild.me).has('EMBED_LINKS')) {
      const embed = new MessageEmbed() // create embed 
        .setAuthor('🎱 The 8 Ball says...')
        .setColor('ORANGE').addField('Question:', question)
        .addField('Answer:', replies[result]);
      await interaction.reply({embeds: [embed]}) // send embed interaction
    } else {
      await interaction.reply(`**Question:**\n${question}\n**Answer:**\n${replies[result]}`); // no permissins so bot will default to a raw interaction
    }
  },
};