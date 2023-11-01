import { watchEffect, state } from "../lib/state";
import { div, span } from "../lib/render";
import { Layout } from "./Layout";
import { Input } from "./Input";
import { Table } from "./Table";
import { Button } from "./Button";

export interface InvoiceItem {
  description: string;
  quantity: number;
  value: number;
}

export interface Invoice {
  total: number;
  items: InvoiceItem[],
}

export function App() {
  const newItem = state<InvoiceItem>({ description: '', quantity: 0, value: 0 });
  const invoice = state<Invoice>({
    items: [{ description: 'Hacktoberfest 2023 T-Shirt', quantity: 10, value: 5.5 }],
    total: 0,
  });

  watchEffect(() => invoice.total = invoice.items.reduce((t, i) => t = t + i.value * i.quantity, 0));

  const addNewItem = () => {
    invoice.items = [...invoice.items, { ...newItem }];
    newItem.quantity = 0;
    newItem.value = 0;
    newItem.description = '';
  }

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
        Button({ text: 'Add', onClick: addNewItem }),
        Table(() => invoice.items),
        div({ class: ['ml-2 mt-4 font-bold'], children: () => [`Total: $ ${String(invoice.total.toFixed(2))}`] }),
      ]
    })
  ]);
}
