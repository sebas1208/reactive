import { watchEffect } from "./state";

export function h1(text: string) {
  const h1 = document.createElement('h2');
  h1.className = 'mb-4 mx-auto font-sans font-thin text-center text-5xl';
  h1.textContent = text;

  return h1;
}

interface InputOptions {
  class: string[];
  onInput?: (ev: Event) => void;
  value: () => string
}
export function input(options: InputOptions) {
  const input = document.createElement('input');
  const { class: classNames, onInput: inputEvent, value = () => '' } = options;
  input.setAttribute('class', classNames.join(' '));
  if (inputEvent) {
    input.addEventListener('input', inputEvent)
  }
  watchEffect(() => input.value = String(value()));

  return input;
}

interface SpanOptions {
  value: () => string
}
export function span(options: SpanOptions) {
  const span = document.createElement('span');
  watchEffect(() => span.innerText = options.value());

  return span;
}

interface ButtonOptions {
  class: string[],
  onClick: EventListener,
  innerText: string;
}
export function button(options: ButtonOptions) {
  const button = document.createElement('button')
  const { class: classNames, onClick, innerText } = options;

  button.addEventListener('click', onClick)
  button.innerText = innerText;
  button.setAttribute('class', classNames.join(' '));

  return button;
}

interface DivOptions {
  class?: string[],
  children: () => (HTMLElement | string)[];
}
export function div(options: DivOptions) {
  const div = document.createElement('div');
  const { class: classNames, children } = options;
  // console.log(children)
  // dom.addEventListener('click', elems)
  // dom.innerText = value;
  const classSetter = () => div.setAttribute('class', (classNames ?? []).join(' '));
  // reactiveMap.set(div, classSetter)
  classSetter();

  watchEffect(() => {
    div.innerHTML = '';
    div.append(...children());
  });

  return div;
}
