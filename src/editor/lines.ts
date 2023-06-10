const formatContent = (content: string): string => {
  const delimeters = /(\(|\)| |\{|\}|;)/.toString().replace(/\//g, "");
  const getKeyword = (keyword: string): RegExp => {
    return new RegExp(`(?:${delimeters}|^)${keyword}(?:${delimeters}|$)`);
  };

  const classKeyword = getKeyword("class");
  console.log(classKeyword);
  content = content.replace(classKeyword, `$1<span class="keyword">class</span>$2`);
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

export const defineLines = (): HTMLOListElement => {
  const list = document.createElement("ol");
  list.appendChild(createLine());

  return list;
};
