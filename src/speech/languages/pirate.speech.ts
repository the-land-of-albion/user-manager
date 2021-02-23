import { CommandVocabulary, PromptingVocabulary } from "../speech.interface";
import { Message } from "discord.js";

const piratePromptingVocabulary: PromptingVocabulary = {
  start: () => `temp`,
  ended: () => `temp`,
  timeout: () => `temp`,
  retry: () => `temp`,
  cancel: () => `temp`,
};
const pirateCommandVocabulary: CommandVocabulary = {
  authRegisterComplete: () => `temp`,
  authRegisterFail: () => `temp`,
  profileBioGetComplete: () => `temp`,
  profileBioGetFailed: () => `temp`,
  profileBioSetComplete: () => `temp`,
  profileBioSetFailed: () => `temp`,
  unknown: () => `temp`,
};

const pirateVocabulary = {
  ...piratePromptingVocabulary,
  ...pirateCommandVocabulary,
};
export default pirateVocabulary;
