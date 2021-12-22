import Lexer from "./ts/lexer/Lexer.ts";
import Parser from "./ts/parser/Parser.ts";
import CodeGenerator from "./ts/semanticAnalyzer/CodeGenerator.ts";
import Compiler from "./ts/compiler/Compiler.ts";

import lexicalRuleset from "./config/exampleAttributeGrammar/exampelLexicalRuleset.ts";
import syntaxRuleset from "./config/exampleAttributeGrammar/exampleSyntaxRuleset.ts";
import semanticRuleset from "./config/exampleAttributeGrammar/exampleSemanticRuleset.ts";

// ====================================================== //
// ======================= Example ====================== //
// ====================================================== //

const lexer = new Lexer(lexicalRuleset);
const parser = new Parser(syntaxRuleset, "PRINT_FUNCTION", ["whitespace"]);
const codeGenerator = new CodeGenerator(semanticRuleset);

const compiler = new Compiler(lexer, parser, codeGenerator);
const compileResult = compiler.compile(`print(Hello World)`);

compileResult();
