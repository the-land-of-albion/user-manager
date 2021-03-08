import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import { MessageReaction } from "discord.js";
import { Collection } from "discord.js";
import { EmbedFieldData } from "discord.js";
import { MessageCollector } from "discord.js";
import { User } from "discord.js";
import { Message } from "discord.js";
import config from "../../config";
import { createCategoryEmbed, createHelpEmbed } from "../../config/help";

class Help extends Command {
  constructor() {
    super("help", {
      aliases: ["help"],
      category: "general",
      description: "Lists general command info.",
      args: [
        {
          id: "category",
          default: "default",
        },
      ],
    });
  }

  async exec2(message: Message, args: Record<string, any>) {
    const commandsByCategory = this.handler.categories.get(args.category);
    const categoryEmbed = createHelpEmbed();
    if (!commandsByCategory) {
      return message.reply(categoryEmbed).then((sentMessage) => {
        sentMessage.react("1️⃣");
        sentMessage.react("2️⃣");
        sentMessage.react("3️⃣");

        return sentMessage
          .awaitReactions(
            (reaction: any, user: User) => user.id == message.author.id,
            { max: 1, time: 30000 }
          )
          .then((collected) => {
            if (collected.first()?.emoji.name == "1️⃣") {
              sentMessage.edit(
                createCategoryEmbed(this.handler.categories.get("game"))
              );
            } else if (collected.first()?.emoji.name == "2️⃣") {
              sentMessage.edit(
                createCategoryEmbed(this.handler.categories.get("score"))
              );
            } else if (collected.first()?.emoji.name == "3️⃣") {
              sentMessage.edit(
                createCategoryEmbed(this.handler.categories.get("general"))
              );
            }
            return;
          })
          .catch(() => message.reply("something went wrong"));
      });
    }

    return message.reply(createCategoryEmbed(commandsByCategory));
  }

  async exec(message: Message) {
    let SearchCollector: MessageCollector;

    /* Embeds */
    const Home = new MessageEmbed()
      .setThumbnail(
        this.client.user?.displayAvatarURL({ dynamic: true }) as string
      )
      .setColor("RANDOM")
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addFields([
        {
          name: "🏠 | Home",
          value: "Returns here.",
        },
        {
          name: "📚 | Commands",
          value: "Shows all categories along with their commands.",
        },
        {
          name: "🔎 | Search",
          value: "Search for any command, alias or category.",
        },
        {
          name: "🔧 | Guide",
          value: "Shows you how to talk to this bot and all things you can do.",
        },
      ]);

    const Commands = new MessageEmbed()
      .setTitle("All available categories.")
      .setThumbnail(
        this.client.user?.displayAvatarURL({ dynamic: true }) as string
      )
      .setColor("RANDOM")
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addFields([
        {
          name: "auth",
          value: "> Creating an account, etc...",
        },
        { name: "profile", value: "> Show profile, see level, rank, experience or set bio, etc..." },
        { name: "general", value: "> General commands." },
      ]);

    const Search = new MessageEmbed()
      .setTitle("Search for a command via category or alias.")
      .addFields([{ name: "Type `cancel` to cancel.", value: "\u200b" }, {name: "categories to try out", value: "> auth, profile, general"}])
      .setThumbnail(
        this.client.user?.displayAvatarURL({ dynamic: true }) as string
      )
      .setColor("RANDOM")
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
    const Guides = new MessageEmbed()
    .setTitle("How to get started.")
      .setThumbnail(
        this.client.user?.displayAvatarURL({ dynamic: true }) as string
      )
      .setColor("RANDOM")
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addFields([
        {
          name: "1. Creating an account",
          value: `> \`${config.bot.prefix} register\`\nGive me a username and **voila**.`,
        },
        {
          name: "2. Showing your profile",
          value: `> \`${config.bot.prefix} show\`, \`${config.bot.prefix} profile\`\nTake a look at your current level, rank, etc.`,
        },
        {
          name: "3. Editing profile",
          value: `> \`${config.bot.prefix} bio\`\n Setting a bio can be fun when working with **Captain Scoreboard** for example.`,
        },
      ]);
    /* Message & Collector*/
    const sentMessage: Message | undefined = await message.reply(Home);
    try {
      await sentMessage.react("🏠");
      await sentMessage.react("📚");
      await sentMessage.react("🔎");
      await sentMessage.react("🔧");
    } catch (er) {
      console.log(er);
    }

    const collector = sentMessage.createReactionCollector(
      (r: MessageReaction, u: User) => {
        return ["🏠", "📚", "🔎", "🔧"].includes(r.emoji.name) && !u.bot;
      },
      { time: 3e5 }
    );
    collector.on("collect", (r: MessageReaction, u: User) => {
      if (u.bot) return;
      if (!["🏠", "📚", "🔎", "🔧"].includes(r.emoji.name)) return;

      r.users.remove(u.id);

      switch (r.emoji.name) {
        case "🏠":
          sentMessage.edit(Home);
          if (SearchCollector?.client) SearchCollector.stop();
          break;

        case "📚":
          sentMessage.edit(Commands);
          if (SearchCollector?.client) SearchCollector.stop();
          break;
        case "🔎":
          sentMessage.edit(Search);
          SearchCollector = sentMessage.channel.createMessageCollector(
            (m: Message) => {
              return (
                !m.author.bot && !u.bot && message.author.id === m.author.id
              );
            },
            { time: 3e5 }
          );
          SearchCollector.on("collect", (m: Message) => {
            if (m.content.toLowerCase() === "cancel") {
              message.channel
                .send(
                  new MessageEmbed().setTitle("Cancelling").setColor("RANDOM")
                )
                .then((_sentMessage) => {
                  m.delete({ timeout: 1000 });
                  _sentMessage.delete({ timeout: 1500 });
                  setTimeout(() => {
                    sentMessage.edit(Home);
                  }, 1500);
                });
              return SearchCollector.stop();
            }
            let res: Collection<string, Command> = this.handler.modules.filter(
              (c) => {
                return (
                  c.categoryID.toLocaleLowerCase() ===
                    m.content.toLocaleLowerCase() ||
                  c.aliases.some((v) => {
                    return (
                      //@ts-ignore
                      v
                        .toLowerCase()
                        .match(new RegExp(m.content.toLowerCase(), "g"))
                        ?.length > 0
                    );
                  })
                );
              }
            );
            const fields: unknown = res.map((command) => ({
              name: command.id,
              value: `> Aliases: ${command.aliases
                .map((e) => `\`${config.bot.prefix} ${e}\``)
                .join(", ")}\n**${command.description}**`,
            }));
            const Result: MessageEmbed = new MessageEmbed()
              .setTitle("Search Results")
              .setColor("RANDOM");
            if (!res.first()) {
              Result.setDescription(
                "No commands or aliases have been found"
              ).addFields([
                {
                  name: "Try searching for one of the following categories",
                  value: "> game, score, general",
                },
              ]);
              try {
                sentMessage.edit(Result);
                m.delete({timeout: 1500});
                return SearchCollector.stop();
              } catch(err){};
            }
            Result.setThumbnail(
              this.client.user?.displayAvatarURL({ dynamic: true }) as string
            )
              .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .addFields(fields as EmbedFieldData[]);
            try {
              m.delete({ timeout: 1500 });
            sentMessage.edit(Result);
            } catch(err){}
          });
          break;

        case "🔧":
          if (SearchCollector?.client) SearchCollector.stop();
          sentMessage.edit(Guides);
          break;
      }
    });
  }
}

export default Help;