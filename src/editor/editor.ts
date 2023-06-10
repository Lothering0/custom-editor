import { setStyles } from "./setStyles";
import { defineLines } from "./lines";

export const useEditor = (element: HTMLElement, id?: string): void => {
  setStyles(element);

  const lines = defineLines(id);
  element.appendChild(lines);
};
