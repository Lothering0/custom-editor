import { BUILTIN_CONSTANTS, KEYWORDS, DECLARE_KEYWORDS, OPERATORS } from "./keywords";

const formatContent = (content: string): string => {
  const delimeters = /([(){}\[\];, ])/.toString().replace(/\//g, "");
  const surroundByDelimeters = (token: string): RegExp => {
    return new RegExp(`(?:${delimeters}|^)(${token})(?:${delimeters}|$)`, "g");
  };

  // Replace strings
  const doubleQuotesRegExp = /"([^"\\]*(\\.[^"\\]*)*)"/g;
  content = content.replace(doubleQuotesRegExp, `<span class="string">"$1"</span>`);
  const singleQuotesRegExp = /'([^'\\]*(\\.[^'\\]*)*)'/g;
  content = content.replace(singleQuotesRegExp, `<span class="string">'$1'</span>`);
  const backTicksRegExp = /`([^`\\]*(\\.[^`\\]*)*)`/g;
  content = content.replace(backTicksRegExp, `<span class="string">\`$1\`</span>`);

  BUILTIN_CONSTANTS.forEach((keyword) => {
    const regExp = surroundByDelimeters(keyword);
    content = content.replace(regExp, `$1<span class="builtin-constant">${keyword}</span>$3`);
  });

  KEYWORDS.forEach((keyword) => {
    const regExp = surroundByDelimeters(keyword);
    content = content.replace(regExp, `$1<span class="keyword">${keyword}</span>$3`);
  });

  DECLARE_KEYWORDS.forEach((keyword) => {
    const regExp = surroundByDelimeters(keyword);

    const identifier = new RegExp(`((?:${delimeters}|^)(?:${keyword})) (\\w+)`, "g");
    content = content.replace(identifier, `$1 <span class="identifier">$3</span>`);

    content = content.replace(regExp, `$1<span class="keyword">${keyword}</span>$3`);
  });

  OPERATORS.forEach((operator) => operator);

  // Replace numbers
  content = content.replace(
    surroundByDelimeters("(?:\\d+n?)|(?:0(?:o|x|b)\\d+)"),
    `$1<span class="number">$2</span>$3`
  );

  return content;
};

export const createLine = (): HTMLLIElement => {
  const line = document.createElement("li");
  const lineInput = document.createElement("input");
  const contentHolder = document.createElement("span");

  line.appendChild(lineInput);
  line.appendChild(contentHolder);

  lineInput.addEventListener("input", (event) => {
    const { value } = <HTMLInputElement>event.target;
    contentHolder.innerHTML = formatContent(value);
  });

  return line;
};

interface SavedLine {
  /** <input> value */
  value: string;
  /** <span> HTML content */
  html: string;
}

interface SavedInfo {
  lines: SavedLine[];
}

const getLineInput = (item: HTMLLIElement): HTMLInputElement => {
  /** First children always <input> */
  return <HTMLInputElement>item.children[0];
};

const getLineSpan = (item: HTMLLIElement): HTMLSpanElement => {
  /** Second children always <span> */
  return <HTMLSpanElement>item.children[1];
};

export const defineLines = (id?: string): HTMLOListElement => {
  const list = document.createElement("ol");

  if (!id) {
    list.appendChild(createLine());
    return list;
  }

  const key = `custom-editor-${id}`;
  const savedContent = localStorage.getItem(key);

  if (savedContent) {
    const { lines } = <SavedInfo>JSON.parse(savedContent);

    lines.forEach(({ html, value }) => {
      const line = createLine();
      getLineSpan(line).innerHTML = html;
      getLineInput(line).value = value;
      list.appendChild(line);
    });

    if (!lines.length) list.appendChild(createLine());
  } else list.appendChild(createLine());

  setInterval(() => {
    const savedInfo: SavedInfo = {
      lines: [...list.children].map((li) => ({
        value: getLineInput(<HTMLLIElement>li).value,
        html: getLineSpan(<HTMLLIElement>li).innerHTML,
      })),
    };

    localStorage.setItem(key, JSON.stringify(savedInfo));
  }, 2 * 1000);

  return list;
};
