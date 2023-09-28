const { MessageEmbed, Interaction } = require("discord.js");
const { readdirSync } = require("fs");
require("dotenv").config()
const prefix = process.env.PREFIX
const emoji = "<a:loading4:818913142583197718>"
module.exports = {
  name: "help",
  aliases : ['h'],
  description: "Shows all available bot commands.",
  options: [
    {
      name: "command",
      description: "the command u wanna search",
      type: 3,
      required: false
    }
  ],
  execute: async (client, interaction, options) => {


    const roleColor =
      interaction.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : interaction.guild.me.displayHexColor;

    if (!interaction.options.getString("command")) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("📬 Here are all of my commands!")
        .addFields(categories)
        .setDescription(
          `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`
        )
        .addField('join to support my bot!', `[support server](https://discord.gg/4VcHRsS7bD)`)
        .setFooter(
          `Requested by ${interaction.user.tag}`,
          interaction.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return interaction.reply({ embeds: [embed] });
    } else {
      const command =
        client.commands.get(interaction.options.getString("command").toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(interaction.options.getString("command").toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("FF0000");
        return interaction.reply({ embeds: [embed] });
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${interaction.user.tag}`,
          interaction.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return interaction.reply({ embeds: [embed] });
    }
  },
};