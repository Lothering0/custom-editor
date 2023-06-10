import { setStyles } from "./setStyles";
import { defineLines } from "./lines";

export const useEditor = (element: HTMLElement): void => {
  setStyles(element);

  const lines = defineLines();
  element.appendChild(lines);
};
