import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import { GuildMember } from "discord.js";
import { Message } from "discord.js";
import config from "../../config";
import { fetch } from "../../config/fetch";
import Options from "../../util/Options";

class ShowProfile extends Command {
  constructor() {
    super("show profile", {
      aliases: ["profile", "show"],
      category: "profile",
      description: "Gets user profile",
      args: [{
        id: "member", type: "member", default: message => message.member, prompt: {
          start: "Please mention a member.", retry: "Nope, it has to be a member mention. Please mention a member.", optional: true
        }
      }]
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    fetch(`${config.api.prefix}/user/${args.member.id}`, "GET")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((user) => {
        const member: GuildMember = args.member;
        const UserCard = new MessageEmbed()
          .setTitle(`${user.title} ${user.username}`)  
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
          .setColor("RANDOM")
          .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .addFields([
            { name: "Lvl", value: user.level },
            { name: "Experience", value: user.experience },
            { name: "Games", value: user.games.length},
            { name: "Bio", value: user.bio || "\u200b" },
            {name: "Member since", value: new Date(member.joinedTimestamp as number).toLocaleDateString()}
          ]);
        return message.reply(UserCard);
      })
      .catch((err) => {
        return message.reply("🚨 You're not in our database yet.");
      });
  }
}

export default ShowProfile;
