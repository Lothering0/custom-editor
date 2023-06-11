import { BUILTIN_CONSTANTS, KEYWORDS, DECLARE_KEYWORDS } from "./keywords";

const formatContent = (content: string): string => {
  const delimiters = /([(){}\[\];, \+\*/])/.toString().replace(/\//g, "");
  const surroundByDelimeters = (token: string): RegExp => {
    return new RegExp(`(?:${delimiters}|^)(${token})(?:${delimiters}|$)`, "g");
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

    const identifier = new RegExp(`((?:${delimiters}|^)(?:${keyword})) (\\w+)`, "g");
    content = content.replace(identifier, `$1 <span class="identifier">$3</span>`);

    content = content.replace(regExp, `$1<span class="keyword">${keyword}</span>$3`);
  });

  // Replace numbers
  content = content.replace(
    surroundByDelimeters("(?:\\d+n?)|(?:0(?:o|O|x|X|b|B)\\d+)"),
    `$1<span class="number">$2</span>$3`
  );

  return content;
};

export const createLine = (): HTMLLIElement => {
  const line = document.createElement("li");
  const contentHolder = document.createElement("span");

  line.appendChild(contentHolder);

  /* lineInput.addEventListener("input", (event) => {
    const { value } = <HTMLInputElement>event.target;
    contentHolder.innerHTML = formatContent(value);
  }); */

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

interface Lines {
  element: HTMLOListElement;
  setContent(content: string): void;
}

const getLineSpan = (item: HTMLLIElement): HTMLSpanElement => {
  /** Second children always <span> */
  return <HTMLSpanElement>item.children[1];
};

export const defineLines = (id?: string): Lines => {
  const list = document.createElement("ol");

  const setContent = (content: string): void => {
    list.innerHTML = "";

    content.split("\n").forEach((value) => {
      const line = createLine();
      line.innerHTML = formatContent(value);
      list.appendChild(line);
    });
  };

  if (!id) {
    list.appendChild(createLine());
    return {
      element: list,
      setContent,
    };
  }

  list.appendChild(createLine());
  return {
    element: list,
    setContent,
  };

  /* const key = `custom-editor-${id}`;
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

  return list; */
};
