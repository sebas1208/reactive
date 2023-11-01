import { watchEffect, state } from "../lib/state";
import { button, div, span } from "../lib/render";
import { Layout } from "./Layout";
import { Input } from "./Input";

interface InvoiceItem {
  description: string;
  quantity: number;
  value: number;
}

interface Invoice {
  total: number;
  items: InvoiceItem[],
}

export function App() {
  const newItem = state<InvoiceItem>({ description: '', quantity: 0, value: 0 });
  const invoice = state<Invoice>({
    items: [{ description: 'Hacktoberfest 2023 T-Shirt', quantity: 10, value: 5.5 }],
    total: 55,
  });

  watchEffect(() => invoice.total = invoice.items.reduce((t, i) => t = t + i.value * i.quantity, 0));

  return Layout([
    div({
      class: [],
      children: () => [
        Input({
          label: 'Description:',
          value: () => newItem.description,
          onInput: (ev: Event) => newItem.description = (<HTMLInputElement>ev?.currentTarget).value
        }),
        Input({
          label: 'Quantity:',
          value: () => String(newItem.quantity),
          onInput: (ev: Event) => newItem.quantity = Number((<HTMLInputElement>ev?.currentTarget).value),
        }),
        Input({
          label: 'Value:',
          value: () => String(newItem.value),
          onInput: (ev: Event) => newItem.value = Number((<HTMLInputElement>ev?.currentTarget).value),
        }),
        button({
          class: ['flex-no-shrink bg-[#4594d0] hover:bg-[#162a51] border-[#4594d0] hover:border-[#162a51] text-sm border-4 text-white py-1 px-2 rounded mt-2'],
          innerText: 'Add',
          onClick: () => {
            invoice.items = [...invoice.items, { ...newItem }];
            newItem.quantity = 0;
            newItem.value = 0;
            newItem.description = '';
          }
        }),
        div({
          class: ['flex justify-between font-bold	mt-4'],
          children: () => [
            div({ children: () => ['Description'] }),
            div({ children: () => ['Quantity'] }),
            div({ children: () => ['Value'] })],
        }),
        div({
          children: () => invoice.items.map(item => div({
            class: ['flex justify-between font-normal	mt-4'],
            children: () => [
              span({ value: () => `${item.description}` }),
              span({ value: () => `${item.quantity}` }),
              span({ value: () => `$ ${item.value.toFixed(2)}` })
            ]
          }))
        }),
        div({
          class: ['mt-4'], children: () => [
            'Total: $ ',
            span({ value: () => String(invoice.total.toFixed(2)) })
          ]
        }),
      ]
    })
  ]);
}
