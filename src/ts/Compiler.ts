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

import Lexer from "./lexer/Lexer";
import Parser from "./parser/Parser";

export default class Compiler {
  lexer: Lexer;
  parser: Parser;
  // not yet implemented
  codeGenerator: any;

  constructor(lexer: Lexer, parser: Parser, codeGenerator: any) {
    this.lexer = lexer;
    this.parser = parser;
    this.codeGenerator = codeGenerator;
  }

  compile(source: string) {
    const tokens = this.lexer.tokenize(source);
    //const ast = this.parser.parse(tokens, );
    //const code = this.codeGenerator.generate(ast);
    //return code;
  }
}
