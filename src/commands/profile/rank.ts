import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { fetch } from "../../config/fetch";
import config from "../../config";
import { MessageEmbed } from "discord.js";
import { Titles } from "@bothaven/common";
import { GuildMember } from "discord.js";

class GetLvl extends Command {
  constructor() {
    super("lvl", {
      aliases: ["lvl", "level", "rank"],
      category: "profile",
      description: "Get a user's level/rank.",
      args: [
        {
          id: "member",
          type: "member",
          prompt: { start: "Mention a user.", retry: "No it has to be a user mention. Please mention a user.", optional: true },
          default: message => message.member,
        
        },
      ],
      channel: "guild"
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    fetch(`${config.api.prefix}/user/${args.member.id}`, "GET")
      .then((res) => {
        if (!res.ok) {
          return message.reply(
            "🚨 Unfortunately, I can't see you in our database."
          );
        }
        return res.json();
      })
      .then((data) => {
        const ranks = Object.values(Titles);
        const highestRank = ranks.reduce((prev, curr) =>
          data.level - prev > data.level - curr ? (curr = prev) : (curr = curr)
        );
        const highestRankIndex = ranks.indexOf(highestRank);
        const nextRankIndex =
          highestRankIndex + 1 < ranks.length
            ? highestRankIndex + 1
            : highestRankIndex;
        const nextRank = ranks[nextRankIndex];
        const member: GuildMember = args.member;
        const RankCard = new MessageEmbed()
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
          .setColor("RANDOM")
          .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .addFields([
            {
              name: `Level ${data.level}`,
              value: `> ${data.experience} XP`,
            },
            { name: "Rank", value: data.title },
            { name: "Next Rank:", value: Titles[nextRank] },
          ]);
        return message.reply(RankCard);
      });
  }
}

export default GetLvl;
