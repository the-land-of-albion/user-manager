import { Command } from "discord-akairo";
import { Message } from "discord.js";
import {fetch} from "../../config/fetch"
import { dialect } from "../../speech";
import { Args } from "../../speech/speech.interface";
import config from "../../config";

const args: Args[] = [{id: "bio", type: "string", default: "", prompt: true}]
class SetBio extends Command {
  constructor() {
    super("bio", {
      aliases: ["bio"],
      args: [{id: "bio", type: "string", default: "", prompt: true}],
      argumentDefaults: {
        prompt: {
          timeout: dialect.timeout(),
          start: dialect.start(args[0].id),
          ended: dialect.ended(),
          cancel: dialect.cancel(),
          retry: dialect.retry()
        }
      }
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    fetch(`${config.api.prefix}/user/${message.member?.id}/bio`, "PATCH", { body: { bio: args.bio }})
      .then((res) => {
        if (!res.ok) {
          return message.reply("🚨 Unfortunately, I can't see you in our database.");
        }
        return message.reply("🛰️ Finished Sir!");
      })

  }
}

export default SetBio;
