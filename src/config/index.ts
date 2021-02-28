import {botHavenSpeech} from "@bothaven/common"; 
const dialect = botHavenSpeech.getDialect("Cop");
const {NODE_ENV} = process.env;
const prefix = NODE_ENV == "production" ? "!auth" :  "?auth";
export default {
    bot: {
        prefix,
        name: "Sergeant. Auth",
        dialect
    },
    api: {
        prefix: "http://localhost:3000"
    }
}
