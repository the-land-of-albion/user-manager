import { Message } from "discord.js";

export interface PromptingVocabulary {
    start: PromptSentence;
    retry: PromptSentence;
    cancel: PromptSentence;
    ended: PromptSentence;
    timeout: PromptSentence;
}

export interface CommandVocabulary {
    authRegisterComplete: CommandSentence,
    authRegisterFail: CommandSentence,
    profileBioSetComplete: CommandSentence,
    profileBioSetFailed: CommandSentence,
    profileBioGetComplete: CommandSentence,
    profileBioGetFailed: CommandSentence,
    unknown: CommandSentence,
}

export interface Vocabulary extends PromptingVocabulary, CommandVocabulary {}
export type Args = { id: string, default: any, prompt: boolean, type: string };
export type Sentence = (args?: any) => string;
export type PromptSentence = (args?: any) => string;
export type CommandSentence = Sentence;