import { Command } from "discord-akairo";
import { Message } from "discord.js";
import {fetch} from "../../config/fetch"
import { dialect } from "../../speech";
import { Args } from "../../speech/speech.interface";
import config from "../../config";

const args: Args[] = [{id: "bio", type: "string", default: "", prompt: true}]
class GetLvl extends Command {
  constructor() {
    super("lvl", {
      aliases: ["lvl", "level", "rank"],
      category: "profile",
      description: "Get a user's level/rank.",
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    fetch(`${config.api.prefix}/user/${message.member?.id}`, "GET")
      .then((res) => {
        if (!res.ok) {
          return message.reply("🚨 Unfortunately, I can't see you in our database.");
        }
        return res.json();
      })
      .then((data) => {

        return message.reply(`Lvl: ${data.level}\nRank: ${data.title}`);
      })

  }
}

export default GetLvl;