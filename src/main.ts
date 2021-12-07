import './style.css'
import Lexer from "./ts/lexer/Lexer.js";
import lexerAlphabet from "./config/alphabet.js";
import Parser from "./ts/parser/Parser.js";
import grammar from "./config/grammar.js";

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
;

const lexer = new Lexer(lexerAlphabet);
const tokens = lexer.tokenize(`[[Hithere]]-(+)->"yourdope"`);

console.log(tokens);
const parser = new Parser(grammar, "GRAPH");

console.log(parser.compiledRule)
parser.parse(tokens);
