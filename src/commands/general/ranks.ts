import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { fetch } from "../../config/fetch";
import config from "../../config";
import { MessageEmbed } from "discord.js";
import {Titles} from "@bothaven/common";

class Ranksw extends Command {
  constructor() {
    super("ranks", {
      aliases: ["ranks", "levels"],
      category: "general",
      description: "Show all available ranks.",
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    fetch(`${config.api.prefix}/user/${message.member?.id}`, "GET")
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
        const titles = Object.keys(Titles);
        const highestRank = ranks.reduce((prev, curr) => data.level - prev > data.level - curr ? curr = prev : curr = curr);
        const highestRankIndex = ranks.indexOf(highestRank);
        const nextRankIndex = (highestRankIndex + 1) < ranks.length ? highestRankIndex + 1 : highestRankIndex;
        const nextRank = ranks[nextRankIndex];
        
        const rawfields = titles.map((title, index) => {
            if (!isNaN(parseInt(title))) return null;
            let addition = "";
            if(title === Titles[highestRank]) addition = "Current:";
            return {name: `${addition} ${title}`, value: `Level required: ${ranks[index]}`}
        })
        const fields = rawfields.filter((e) => e !== null) as ({name: string, value: string})[];
        const RankCard = new MessageEmbed()
          .setThumbnail(
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setColor("RANDOM")
          .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .addFields(fields);
        return message.reply(RankCard);
      });
  }
}

export default Ranksw;
