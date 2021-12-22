// ##################################################################### //
// ############################## Compiler ############################# //
// ##################################################################### //

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
