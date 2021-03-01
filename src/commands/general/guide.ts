import { Command } from "discord-akairo";
import { Message } from "discord.js";
import config from "../../config";
import { createCategoryEmbed } from "../../config/help";

export default class Guide extends Command {
    constructor(){
        super("guide", {
            aliases: ["guide", "howto"],
            category: "general",
            channel: "guild" || "dm",
            description: "How to get started?"
        })
        
    }
    exec(message: Message) {
        message.author.send("**A guide on \"how to propelery talk to me\"**")
        message.author.send(createCategoryEmbed(this.handler.categories.get("auth")));
        message.author.send(`1. **Creating your account**
For that do \`${config.bot.prefix} register\`.
Once you do I will ask you how you want to be called. No worries, I'm quite the patient lad.
2. **Setting your bio**
Simply do \`${config.bot.prefix} bio\`.
Why you may ask? When playing a game, the person who's winning gets to display their bio on the game.
3. **Viewing your profile**
You can do \`${config.bot.prefix} profile\` or \`${config.bot.prefix} show\` to view your profile.

For more information feel free to reach out to me. Just do \`${config.bot.prefix} help\` and I can help you out.
\`${config.bot.prefix} invite\`
        `).then((sentInstruction) => {
            sentInstruction.react("👍");
            sentInstruction.react("👎");
        })
    }
}