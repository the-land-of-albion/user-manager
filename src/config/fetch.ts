import { OptionsBuilder } from "@bothaven/common";

const _optionsBuilder = new OptionsBuilder()
export const optionsBuilder = _optionsBuilder;
export const fetch = _optionsBuilder.fetch;
