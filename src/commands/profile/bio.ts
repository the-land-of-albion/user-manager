import { Command } from "discord-akairo";
import { Message } from "discord.js";
import * as fetch from "node-fetch";
import Options from "../../util/Options";

class SetBio extends Command {
  constructor() {
    super("bio", {
      aliases: ["bio"],
      args: [{id: "bio", type: "string", default: ""}]
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    const options = new Options("PUT", {bio: args.bio}).transform()
    console.log(options);
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
