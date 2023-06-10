export const setStyles = (element: HTMLElement): void => {
  const customId = Math.random().toString().slice(-4);
  element.classList.add(`editor-${customId}`);

  const styles = document.createElement("style");
  const elementSelector = `.editor-${customId}`;
  const linesSelector = `${elementSelector} > ol`;
  const singleLineSelector = `${linesSelector} > li`;

  document.head.appendChild(styles);
  styles.innerHTML = `
    ${elementSelector} {
      padding: 10px 15px 10px 45px;
      border-radius: 8px;
      background-color: #333;
      color: #bbb;
      outline: none;
    }

    ${elementSelector} *::selection {
      background-color: rgba(138, 138, 138, 0.5);
    }

    ${linesSelector} {
      counter-reset: line;
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    ${singleLineSelector} {
      position: relative;
      display: block;
      height: 20px;
    }

    ${singleLineSelector}::before {
      counter-increment: line;
      content: counter(line);
      position: absolute;
      left: -45px;
      width: 30px;
      color: #676767;
      text-align: right;
    }

    ${elementSelector},
    ${singleLineSelector} > input {
      font-family: monospace;
      font-size: 15px;
    }

    ${singleLineSelector} > input {
      position: absolute;
      width: 100%;
      height: 100%;
      padding: 0;
      background-color: transparent;
      border: none;
      color: transparent;
      caret-color: white;
      outline: none;
    }

    ${singleLineSelector} > span {
      white-space: pre-wrap;
    }

    ${elementSelector} .number {
      color: #a796f9;
    }

    ${elementSelector} .string {
      color: #7db36e;
    }

    ${elementSelector} .builtin-constant {
      color: #d99051;
    }

    ${elementSelector} .keyword {
      color: #c73cdb;
    }

    ${elementSelector} .identifier {
      color: #f0c954;
    }
  `;
};
