import * as path from "path";
import * as dotenv from "dotenv";
const PDotEnv = path.join(path.dirname(__dirname), ".env");
dotenv.config({path:PDotEnv});
import myClient from "./client";

myClient.start();