export const setStyles = (element: HTMLElement): void => {
  const customId = Date.now().toString().slice(-4);
  element.classList.add(`editor-${customId}`);

  element.style.padding = "10px 15px 10px 45px";
  element.style.borderRadius = "8px";
  element.style.backgroundColor = "#333";
  element.style.color = "#bbb";
  element.style.fontFamily = "monospace";
  element.style.fontSize = "15px";
  element.style.outline = "none";

  const styles = document.createElement("style");
  const elementSelector = `.editor-${customId}`;
  styles.innerHTML = `
    ${elementSelector}::selection {
      background-color: rgba(138, 138, 138, 0.5);
    }

    ${elementSelector} > div {
      position: relative;
    }

    ${elementSelector} > div::before {
      counter-increment: count;
      content: counter(count);
      left: -20px;
      position: absolute;
      color: #676767;
    }
  `;

  document.head.appendChild(styles);
};
