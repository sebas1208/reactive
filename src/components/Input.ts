import { div, input } from "../lib/render";


interface InputOptions {
  value: () => string;
  onInput: (ev: Event) => void;
  label: string;
}
export function Input({ value, onInput, label }: InputOptions) {
  return div({
    class: 'mb-4',
    children: () => [
      label,
      input({
        class: 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
        value,
        onInput,
      })
    ]
  })
}
