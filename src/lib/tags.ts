import { reactiveMap, watchEffect } from "./state";

export function Component(renderFn: Function) {
  const result = renderFn();
  console.log(result);
}

interface H1Options {
  class: string[];
  value: () => string;
}
export function h1(options: H1Options) {
  const h1 = document.createElement('h1');
  const { class: classNames, value } = options;
  // dom.addEventListener('click', elems)
  // dom.innerText = value;
  const classSetter = () => h1.setAttribute('class', (classNames ?? []).join(' '));
  // reactiveMap.set(div, classSetter)
  watchEffect(classSetter);

  h1.append(value())
  console.log(h1);
  return h1;
}

interface InputOptions {
  class: string[];
  input?: (ev: Event) => void;
  value: () => string
}
export function input(options: InputOptions) {
  const input = document.createElement('input');
  const { class: classNames, input: inputEvent, value = () => '' } = options;
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
  watchEffect(() => {
    console.log('Setting Inner Text', options.value);
    span.innerText = options.value();
  });

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
