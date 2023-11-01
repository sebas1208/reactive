import { Layout } from "./Layout";

export interface ShoppingItem {
  description: string;
  quantity: number;
  value: number;
}

export interface Shopping {
  total: number;
  items: ShoppingItem[],
}

export function App() {
  const shopping: Shopping = {
    items: [{ description: 'Camisetas Hacktoberfest 2023', quantity: 5, value: 10 }],
    total: 0,
  };

  shopping.total = shopping.items.reduce((total, item) => total += (item.quantity * item.value), 0);

  shopping.items = [...shopping.items, { description: 'Gifts', quantity: 3, value: 100 }];

  console.log(shopping.total);

  return Layout([`Hello World`]);
}
