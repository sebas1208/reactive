import { watchEffect } from "./state";

export const render = (strings: TemplateStringsArray, ...rest: unknown[]) => {
  // console.log((new DOMParser()).parseFromString(strings[0], 'text/html'));
  watchEffect(() => console.log('Rendering', ...rest));

  return strings.join(' ');
}
