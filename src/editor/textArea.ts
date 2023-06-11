interface Listeners {
  onInput(value: string): void;
  onScroll(top: number): void;
}

export const defineTextArea = (listeners: Listeners): HTMLTextAreaElement => {
  const textArea = document.createElement("textarea");

  textArea.spellcheck = false;
  textArea.addEventListener("input", (event) => {
    const { value } = <HTMLInputElement>event.target;
    listeners.onInput(value);
  });
  textArea.addEventListener("scroll", (event) => {
    const { scrollTop } = <HTMLInputElement>event.target;
    listeners.onScroll(scrollTop);
  });

  return textArea;
};
