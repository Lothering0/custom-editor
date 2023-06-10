import { setStyles } from "./setStyles";

export const useEditor = (element: HTMLElement): void => {
  setStyles(element);

  element.appendChild(document.createElement("div"));
  element.contentEditable = "true";

  element.addEventListener("input", (): void => {
    console.log(element.innerHTML);

    /* if (!element.innerHTML.startsWith("<div>")) {
      element.innerHTML = element.innerHTML.replace(/(.+)(?=<)/, "<div>$1</div>");
    } */
    /* element.innerHTML = element.innerHTML
      .replace("<div>", "")
      .replace("</div>", "")
      .split("<br>")
      .filter(Boolean)
      .map((line) => `<div>${line}</div>`)
      .join(""); */

    if (element.innerHTML === "" || element.innerHTML === "<br>") {
      element.innerHTML = `<div></div><br>`;
    }
  });
};
