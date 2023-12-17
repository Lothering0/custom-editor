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
      position: relative;
      border-radius: 8px;
      background-color: #333;
      color: #bbb;
      outline: none;
      overflow: hidden;
    }

    ${elementSelector},
    ${elementSelector} > textarea {
      padding: 10px 15px 10px 45px;
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
    ${elementSelector} > textarea {
      font-family: monospace;
      font-size: 15px;
    }

    ${elementSelector} > textarea {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      background-color: transparent;
      border: none;
      color: transparent;
      caret-color: white;
      outline: none;
      resize: none;
      z-index: 2;
    }

    ${singleLineSelector} {
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

    ${elementSelector} .comment {
      color: #6e6e6e;
    }
  `;
};
