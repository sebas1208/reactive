import { div, tag } from "../lib/render";
import { InvoiceItem } from "./App";

export function Table(items: () => InvoiceItem[]) {
  return div({
    class: ['relative overflow-x-auto'], children: () => [
      tag('table', 'w-full text-sm text-left text-gray-500 dark:text-gray-400', [
        tag('thead', 'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400', [
          tag('tr', '', [
            tag('th', 'px-6 py-3', ['Descripción']),
            tag('th', 'px-6 py-3', ['Cantidad']),
            tag('th', 'px-6 py-3', ['Valor']),
          ]),
        ]),
        tag('tbody', '', [...items().map(item => tag('tr', 'bg-white border-b dark:bg-gray-800 dark:border-gray-700', [
          tag(
            'th',
            'px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white',
            [item.description]
          ),
          tag(
            'td',
            'px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white',
            [String(item.quantity)]
          ),
          tag(
            'td',
            'px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white',
            [`$ ${String(item.value.toFixed(2))}`]
          ),
        ]))])
      ]),
    ]
  });
}
