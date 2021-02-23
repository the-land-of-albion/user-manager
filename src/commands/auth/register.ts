import { Command } from "discord-akairo";
import { Message } from "discord.js";
import * as fetch from "node-fetch";
import Options from "../../util/Options";
import config from "../../config";
import { dialect } from "../../speech";
class Register extends Command {
  constructor() {
    super("register user", {
      aliases: ["register"]
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    const options = new Options("POST", {username: message.member?.id, password: "discord", _password: "discord"}).transform()
    const res: Response = await fetch(
      `${config.api.prefix}/auth/new`, options
    );
      
    if (!res.ok) {
      return message.reply(dialect.authRegisterFail());
    }
    return message.reply(dialect.authRegisterComplete());
  }
}

export default Register;
