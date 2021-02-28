import { Command } from "discord-akairo";
import { Message } from "discord.js";
import config from "../../config";
import {fetch} from "../../config/fetch";
import Options from "../../util/Options";

class ShowProfile extends Command {
  constructor() {
    super("show profile", {
      aliases: ["profile", "show"],
      category: "profile",
      description: "Gets user profile"
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    fetch(
      `${config.api.prefix}/user/${message.member?.id}`, "GET"
    )
      .then((res) => {
        if(!res.ok) throw new Error()
        return res.json()
      })
      .then((user) => {
        message.reply("🛰️ Found some data.");
        return message.reply((JSON.stringify(user, null, 2)));
      })
      .catch((err) => {
        return message.reply("🚨 You're not in our database yet.")
      })
  }
}

export default ShowProfile;
