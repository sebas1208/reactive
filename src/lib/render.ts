import { watchEffect } from "./state";

export function h1(text: string) {
  const h1 = document.createElement('h2');
  h1.className = 'mb-4 mx-auto font-sans font-thin text-center text-5xl';
  h1.textContent = text;

  return h1;
}

interface InputOptions {
  class?: string;
  onInput?: (ev: Event) => void;
  value: () => string
}
export function input(options: InputOptions) {
  const input = document.createElement('input');
  const { class: classNames, onInput: inputEvent, value = () => '' } = options;
  input.setAttribute('class', classNames ?? '');
  if (inputEvent) {
    input.addEventListener('input', inputEvent)
  }
  watchEffect(() => input.value = String(value()));

  return input;
}

interface ButtonOptions {
  class?: string,
  onClick: EventListener,
  text: string;
}
export function button(options: ButtonOptions) {
  const button = document.createElement('button')
  const { class: classNames, onClick, text: innerText } = options;

  button.addEventListener('click', onClick)
  button.innerText = innerText;
  button.setAttribute('class', classNames ?? '');

  return button;
}

interface DivOptions {
  class?: string,
  children: () => (HTMLElement | string)[];
}
export function div(options: DivOptions) {
  const { class: classNames, children } = options;
  const div = document.createElement('div');
  div.setAttribute('class', classNames ?? '');

  div.innerHTML = '';
  div.append(...children());  

  return div;
}


export function tag(tag: string, className: string, children: (HTMLElement | string)[]) {
  const table = document.createElement(tag);
  table.className = className;
  table.append(...children);

  return table;
}
