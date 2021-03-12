import {botHavenSpeech, npcs} from "@bothaven/common"; 
const dialect = botHavenSpeech.getDialect("Cop");
const {NODE_ENV} = process.env;
const prefix = NODE_ENV == "production" ? "!auth" :  "?auth";
export default {
    bot: {
        prefix: prefix, //npcs.bots.LordHewelet.prefix(process.env.NODE_ENV),
        name: npcs.bots.LordHewelet.name,
        iconURL: npcs.bots.LordHewelet.avatar,
        dialect
    },
    api: {
        prefix: "http://localhost:3000"
    }
}
