import { Listener } from "discord-akairo";
import { GuildMember } from "discord.js";
import config from "../config";

class UserAdd extends Listener {
  constructor() {
    super("guildMemberAdd", {
      emitter: "client",
      event: "guildMemberAdd",
    });
  }

  exec(member: GuildMember) {
    const role = member.guild.roles.cache.find(
      (role) => role.name === "Passenger"
    );
    if (role) {
      member.roles.add(role);
    }else{
        console.log("couldnt find role")
    }
    member.createDM().then((dm) => {
      dm.send('**A guide on "how to propelery talk to me"**');
      dm.send(
        `1. **Creating your account**
For that do \`${config.bot.prefix} register\`.
Once you do I will ask you how you want to be called. No worries, I'm quite the patient lad.
2. **Setting your bio**
Simply do \`${config.bot.prefix} bio\`.
Why you may ask? When playing a game, the person who's winning gets to display their bio on the game.
3. **Viewing your profile**
You can do \`${config.bot.prefix} profile\` or \`${config.bot.prefix} show\` to view your profile.

For more information feel free to reach out to me. Just do \`${config.bot.prefix} help\` and I can help you out.
\`${config.bot.prefix} invite\`
        `
      ).then((sentInstruction) => {
        sentInstruction.react("👍");
        sentInstruction.react("👎");
      });
    });
  }
}

export default UserAdd;
