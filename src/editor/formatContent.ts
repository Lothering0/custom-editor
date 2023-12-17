import { BUILTIN_CONSTANTS, KEYWORDS, DECLARE_KEYWORDS } from "./keywords";

export const formatContent = (content: string): string => {
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

  // Replace comments
  content = content.replace(/(\/\/.*)/g, `<span class="comment">$1</span>`);
  // content = content.replace(/(\/\*.*\*\/)|(\/\*.*)|(.*\*\/)/gm, `<span class="comment">$1$2$3</span>`);
  // content = content.replace(/(\/\*(?:[\s\S]*?)\*\/)/gm, `<span class="comment">$1</span>`);
  content = content.replace(/(\/\*(?:[\s\S]*?(?:<li>)?)\*\/)/gm, `<span class="comment">$1</span>`);

  return content;
};
