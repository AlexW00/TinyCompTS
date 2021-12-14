import "./style.css";
import Lexer from "./ts/lexer/Lexer.js";
import lexerAlphabet from "./config/attributeGrammar/lexicalRules.js";
import Parser from "./ts/parser/Parser.js";
import grammar from "./config/attributeGrammar/syntacticRules.js";
import CodeGenerator from "./ts/semanticAnalyzer/CodeGenerator";
import attributeGrammar from "./config/attributeGrammar/semanticRules";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;

const lexer = new Lexer(lexerAlphabet);
const tokens = lexer.tokenize(`[[Hithere]]-(+)->"yourdope"`);

console.log(tokens);
const parser = new Parser(grammar, "GRAPH");

const parsedResult = parser.parse(tokens);
console.log(parsedResult);

const codeGenerator = new CodeGenerator(attributeGrammar);
if (parsedResult) console.log(codeGenerator.generate(parsedResult));

function identity<T>(arg: T): T {
  return arg;
}
