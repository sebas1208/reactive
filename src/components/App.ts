import { Layout } from "./Layout";

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
  const invoice: Invoice = {
    items: [{ description: 'Hacktoberfest 2023 T-Shirt', quantity: 10, value: 5.5 }],
    total: 0,
  };

  invoice.total = invoice.items.reduce((total, item) => total += (item.quantity * item.value), 0);

  invoice.items = [...invoice.items, { description: 'Gifts', quantity: 3, value: 100 }];

  console.log(invoice.items);

  return Layout([`Total: $ ${invoice.total}`]);
}
