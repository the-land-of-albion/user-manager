import {botHavenSpeech} from "@bothaven/common"; 
const dialect = botHavenSpeech.getDialect("Cop");
const {NODE_ENV} = process.env;
const prefix = NODE_ENV == "production" ? "!auth" :  "?auth";
export default {
    bot: {
        prefix,
        name: "Lord Hewelet",
        iconURL: "https://raw.githubusercontent.com/BotHaven/static/main/img/three-wise-men/melchor.png",
        dialect
    },
    api: {
        prefix: "http://localhost:3000"
    }
}
