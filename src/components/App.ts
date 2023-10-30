import { watchEffect, state, computed } from "../lib/state";
import { button, div, input, span } from "../lib/tags";

export function App() {
  const invoice = state({
    items: [
      { description: 'Hacktoberfest 2023 T-Shirt', quantity: 10, value: 5.5 }
    ],
    total: 0,
  });

  watchEffect(() => {
    invoice.total = invoice.items.reduce((t, i) => t = t + i.value * i.quantity, 0)
    console.log('Total: ', invoice.total);
  });

  invoice.items = [...invoice.items, { description: 'Hacktoberfest 2022 T-Shirt', quantity: 5, value: 6.5 }];

  // invoice.items.push({ description: 'New Items', quantity: 4, value: 6.50 })
  // return div({
  //   class: [],
  //   children: () => [
  //     'Description:',
  //     input({
  //       class: ['font-sans font-thin text-2xl appearance-none border-none w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none'],
  //       value: () => newItem.description,
  //       input: (ev: Event) => newItem.description = (<HTMLInputElement>ev?.currentTarget).value,
  //     }),
  //     'Quantity:',
  //     input({
  //       class: ['font-sans font-thin text-2xl appearance-none border-none w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none'],
  //       value: () => newItem.quantity,
  //       input: (ev: Event) => newItem.quantity = Number((<HTMLInputElement>ev?.currentTarget).value),
  //     }),
  //     'Value:',
  //     input({
  //       class: ['font-sans font-thin text-2xl appearance-none border-none w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none'],
  //       value: () => newItem.value,
  //       input: (ev: Event) => newItem.value = Number((<HTMLInputElement>ev?.currentTarget).value),
  //     }),
  //     button({
  //       class: ['flex-no-shrink bg-[#4594d0] hover:bg-[#162a51] border-[#4594d0] hover:border-[#162a51] text-sm border-4 text-white py-1 px-2 rounded mt-2'],
  //       innerText: 'Add',
  //       onClick: () => {
  //         invoice.items = [...invoice.items, newItem];
  //         newItem.quantity = 0;
  //         newItem.value = 0;
  //         newItem.description = '';
  //       }
  //     }),
  //     div({
  //       class: ['flex justify-between font-bold	mt-4'],
  //       children: () => ['Description', 'Quantity', 'Value'].map(item => div({ children: () => [item] }))
  //     }),
  //     div({
  //       children: () => invoice.items.map(item => div({
  //         class: ['flex justify-between'],
  //         children: () => [
  //           span({ value: () => `${item.description}` }),
  //           span({ value: () => `${item.quantity}` }),
  //           span({ value: () => `$ ${item.value.toFixed(2)}` })
  //         ]
  //       }))
  //     }),
  //     div({
  //       class: ['mt-4'], children: () => [
  //         'Total: $ ',
  //         span({ value: () => String(invoice.total.toFixed(2)) })
  //       ]
  //     }),
  //   ]
  // })
  return document.createElement('div');
  // return render`<span>${invoice.name}</span>`
}
