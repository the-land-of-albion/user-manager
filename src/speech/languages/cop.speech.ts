import { Args, CommandVocabulary, PromptingVocabulary } from "../speech.interface";
import { Message } from "discord.js";

const copPromptingVocabulary: PromptingVocabulary = {
  start: (bio: string) => `Go ahead! I see you haven't even written your \`${bio}\` yet. I want that report in the **input bar** 5 minutes ago!`,
  ended: () => `It was a pleasure working with you chief.`,
  timeout: () => `You know what, since you didn't complete this in time, I will let you off with a warning.`,
  retry: () => `You get another shot detective. Make it count.`,
  cancel: () => `I am in incredible pain right now.`,
};
const copCommandVocabulary: CommandVocabulary = {
  authRegisterComplete: () => `🛰️ Finished Sir!`,
  authRegisterFail: () => `🚨 News Sir! Can't do that.`,
  profileBioGetComplete: () => `temp`,
  profileBioGetFailed: () => `temp`,
  profileBioSetComplete: () => `temp`,
  profileBioSetFailed: () => `temp`,
  unknown: () => `temp`,
};

const copVocabulary = { ...copPromptingVocabulary, ...copCommandVocabulary };
export default copVocabulary;
