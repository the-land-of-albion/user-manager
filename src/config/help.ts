import { Category, Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import config from ".";

export function createHelpEmbed(){
    const categoriesEmbed = new MessageEmbed()
      .setColor("#FC2C26")
      .setTitle("Command categories.")
      .setDescription("Try doing **!auth help profile**")
      .setTimestamp()
      .setImage(
        "https://raw.githubusercontent.com/BotHaven/static/main/img/sgt_auth.png"
      )
      .setFooter("For more info on seperate commands do `!auth help <category>`")
      .addField("1️⃣ auth", "> Auth related commands, register,...")
      .addField(
        "2️⃣ profile",
        "> Profile related commands, getting profile, setting bio,..."
      )
      .addField("3️⃣ general", "> General commands ie: ping, help,...");
      return categoriesEmbed
}

export function createCategoryEmbed(
      category: Category<string, Command> | undefined
    ) {
      console.log(category?.id);
      if (!category) return new MessageEmbed();
      const fields = category.map((cat) => ({
        name: cat.id || "nothing",
        value: `> ${
          cat.description || "nothing"
        }\n Aliases: **${cat.aliases.map((val)=> `${config.bot.prefix} ${val}`).join(", ")}**`,
      }));
      const embed = new MessageEmbed()
        .setColor("#FC2C26")
        .setTitle(`Category: ${category.id}`)
        .setDescription("Game related commands, creating, deleting,...")
        .setAuthor(
          "Sir, yes sir!",
          "https://raw.githubusercontent.com/BotHaven/static/main/img/sgt_auth.png"
        )
        .setTimestamp()
        .addFields(fields);
      return embed;
    }