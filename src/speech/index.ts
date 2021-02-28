import pirateVocabulary from "./languages/pirate.speech";
import copVocabulary from "./languages/cop.speech";
import { Vocabulary } from "./speech.interface";

export enum Dialects{
    "Pirate" = "Pirate", 
    "Cop" = "Cop"
}
type DialectKeys = keyof typeof Dialects; 
class Speech {
    forDialect(dialect: DialectKeys){
        let selected: Vocabulary | unknown;
        switch (dialect) {
            case Dialects.Pirate:
                selected = pirateVocabulary;
                break;
            case Dialects.Cop:
                selected = copVocabulary;
                break;
            default:
                selected = copVocabulary;
                break;
        }
        return selected as Vocabulary;
    }
}

export const dialect = new Speech().forDialect(Dialects.Cop);