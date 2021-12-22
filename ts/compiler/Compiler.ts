/*
# Compiler structure

## Front end

### Syntactic analysis

#### 1. Lexing

- Convert input string into sequence of tokens

#### 2. Parsing (= tagging tokens)

- Convert input token sequence to a parse tree
- Context-free grammar

## Semantic analysis (= synthesizing js from tagged tokens)

- Convert input parse tree into a symbol table by adding semantic information
- Attribute grammar
*/

import Lexer from "../lexer/Lexer.ts";
import Parser from "../parser/Parser.ts";
import CodeGenerator from "../semanticAnalyzer/CodeGenerator.ts";

export default class Compiler {
  lexer: Lexer;
  parser: Parser;
  codeGenerator: CodeGenerator;

  constructor(lexer: Lexer, parser: Parser, codeGenerator: CodeGenerator) {
    this.lexer = lexer;
    this.parser = parser;
    this.codeGenerator = codeGenerator;
  }

  compile(input: string): any {
    const tokens = this.lexer.tokenize(input);
    const syntaxParseTree = this.parser.parse(tokens);
    return this.codeGenerator.generate(syntaxParseTree);
  }
}
