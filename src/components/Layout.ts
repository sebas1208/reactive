import { div, h1 } from "../lib/render";

export function Layout(children: HTMLElement[]) {
  return div({
    class: ['container mx-auto w-3/4 h-auto p-4 mt-5 rounded-lg'],
    children: () => [
      div({
        class: ['flex flex-wrap flex-col h-full bg-gray-100 rounded-lg overflow-scroll p-2 shadow-lg'],
        children: () => [
          h1('Hacktoberfest Items!'),
          ...children
        ],
      })
    ],
  });
}
