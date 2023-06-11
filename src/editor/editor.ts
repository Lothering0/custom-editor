import { setStyles } from "./setStyles";
import { defineLines } from "./lines";
import { defineTextArea } from "./textArea";

export const useEditor = (element: HTMLElement, id?: string): void => {
  setStyles(element);

  const lines = defineLines(id);
  const textArea = defineTextArea({
    onInput: (value) => lines.setContent(value),
    onScroll: (top) => (element.scrollTop = top),
  });

  [textArea, lines.element].forEach((child) => element.appendChild(child));
};
