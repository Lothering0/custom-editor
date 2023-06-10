import "./style.css";
import { useEditor } from "./editor";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="editor" style="width: 100%; height: 200px"></div>
`;

const editorElement = document.getElementById("editor");

if (editorElement) useEditor(editorElement);
