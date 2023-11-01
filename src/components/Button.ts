import { button } from "../lib/render";

export function Button({ text, onClick }: { text: string, onClick: EventListener }) {
  return button({
    class: ['mb-4 flex-no-shrink bg-[#4594d0] hover:bg-[#162a51] border-[#4594d0] hover:border-[#162a51] text-sm border-4 text-white py-1 px-2 rounded mt-2'],
    text: text,
    onClick: onClick,
  });
}
