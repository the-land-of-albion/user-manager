import { Command } from "discord-akairo";
import { Message } from "discord.js";
import * as fetch from "node-fetch";
import Game from "../../util/Game";
import Options from "../../util/Options";

class Register extends Command {
  constructor() {
    super("new", {
      aliases: ["new", "n"],
    });
  }

  async exec(message: Message, args: Record<string, any>) {

    const res: Response = await fetch(
      `http://localhost:3000/auth/new/${message.member?.id}`
    );

    if (!res.ok) {
      return message.reply("🚨 News Sir! Can't do that.");
    }
    return message.reply("🛰️ Finished Sir!");
  }
}

export default Register;
