import { Command } from "discord-akairo";
import { Message } from "discord.js";
import {fetch} from "../../config/fetch";
import config from "../../config";
class Register extends Command {
  constructor() {
    super("register user", {
      aliases: ["register"],
      category: "auth",
      description: "Register an account.",
      args: [
        { 
          id: "username",
          type: "/^[a-zA-Z0-9$&+,:;=?@#|'<>.^*()%!-]*$/i",
          prompt: {
            start: () => "You were missing the username. Feel free to enter it now.",
            timeout: () => "Whoops, that's a timeout.",
            cancel: () => "Sure thing, come back later.",
            retry: () => "Unfortunetely, we only accept non-spaced usernames.",
            ended: () => "Great, that about wraps it up. Thanks."
          }
        }
      ]
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    // if((args.username as string).includes(" ")) return message.reply("Unfortunetely, we only accept non-spaced usernames.")
    const body = {
      username: args.username.toLowerCase(),
      password: "discord",
      _password: "discord",
      oauth_id: message.member?.id
    };
    fetch(`${config.api.prefix}/user`, "POST", {
      body,
    })
      .then((res) =>  {
        if(res.ok){
          return message.reply(config.bot.dialect.authRegisterComplete())
        } else if(res.status == 409){
          return message.reply("Either that name is taken or you already registered. Feel free to do `!auth whoAmI` for further information.")
        } 
        else {
          return message.reply(config.bot.dialect.authRegisterFail());
        }
      })
  }
}

export default Register;
