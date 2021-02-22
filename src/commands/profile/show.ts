import { Command } from "discord-akairo";
import { Message } from "discord.js";
import * as fetch from "node-fetch";
import Options from "../../util/Options";

class ShowProfile extends Command {
  constructor() {
    super("show profile", {
      aliases: ["profile", "show"],
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    const options = new Options("GET").transform()
    const res: Response = await fetch(
      `http://localhost:3000/auth/user/${message.member?.id}`, options
    );
    if (!res.ok) {
      return message.reply("🚨 News Sir! Can't do that.");
    }
    const data = await res.json();
    message.reply("🛰️ Found some data.");
    return message.reply(JSON.stringify(data,null, 2));
  }
}

export default ShowProfile;
