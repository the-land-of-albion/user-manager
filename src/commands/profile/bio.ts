import { Command } from "discord-akairo";
import { Message } from "discord.js";
import * as fetch from "node-fetch";
import Options from "../../util/Options";
import { dialect } from "../../speech";
import { Args } from "../../speech/speech.interface";

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
    const options = new Options("PUT", {bio: args.bio}).transform()
    const res: Response = await fetch(
      `http://localhost:3000/auth/bio/${message.member?.id}`, options
    );
    if (!res.ok) {
      return message.reply("🚨 News Sir! Can't do that.");
    }
    return message.reply("🛰️ Finished Sir!");
  }
}

export default SetBio;
