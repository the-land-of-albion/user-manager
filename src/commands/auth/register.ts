import { Command } from "discord-akairo";
import { Message } from "discord.js";
import * as fetch from "node-fetch";
import Game from "../../util/Game";
import Options from "../../util/Options";

class Register extends Command {
  constructor() {
    super("new", {
      aliases: ["new", "n", "register"],
      args: [{id: "password", type: "string", default: "abc"}, {id: "_password", type: "string", default: "ab"}]
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    const options = new Options("POST", {username: message.member?.id, password: args.password, _password: args._password}).transform()
    console.log(options);
    const res: Response = await fetch(
      `http://localhost:3000/auth/new`, options
    );
    if (!res.ok) {
      return message.reply("🚨 News Sir! Can't do that.");
    }
    return message.reply("🛰️ Finished Sir!");
  }
}

export default Register;
