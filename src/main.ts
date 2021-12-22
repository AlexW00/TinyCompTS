import "./style.css";
import Lexer from "./ts/lexer/Lexer.js";
import Parser from "./ts/parser/Parser.js";
import CodeGenerator from "./ts/semanticAnalyzer/CodeGenerator";
import Compiler from "./ts/compiler/Compiler";

import lexicalRuleset from "./config/exampleAttributeGrammar/exampelLexicalRuleset";
import syntaxRuleset from "./config/exampleAttributeGrammar/exampleSyntaxRuleset";
import semanticRuleset from "./config/exampleAttributeGrammar/exampleSemanticRuleset";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;

const lexer = new Lexer(lexicalRuleset);
const parser = new Parser(syntaxRuleset, "PRINT_FUNCTION", ["whitespace"]);
const codeGenerator = new CodeGenerator(semanticRuleset);

const compiler = new Compiler(lexer, parser, codeGenerator);
const compileResult = compiler.compile(`print(helloorld)`);

compileResult();
