// deno-lint-ignore-file
// ##################################################################### //
// ############################## Compiler ############################# //
// ##################################################################### //

import AttributeGrammar from "./attributeGrammar/attributeGrammar.ts";
import Lexer from "./lexer/Lexer.ts";
import Parser from "./parser/Parser.ts";
import CodeGenerator from "./codeGenerator/CodeGenerator.ts";

// Interface that describes extra options for the compiler
export interface CompilerOptions {
  startSymbol: string; // the start symbol of the grammar (root of the syntax tree)
  ignoreTokensNamed?: string[]; // the names of the tokens that should be ignored by the lexer
}

export default class Compiler {
  lexer: Lexer;
  parser: Parser;
  codeGenerator: CodeGenerator;

  constructor(
    attributeGrammar: AttributeGrammar,
    compilerOptions: CompilerOptions
  ) {
    this.lexer = new Lexer(attributeGrammar.lexicalRuleset);
    this.parser = new Parser(
      attributeGrammar.syntaxRuleset,
      compilerOptions.startSymbol,
      compilerOptions.ignoreTokensNamed ?? []
    );
    this.codeGenerator = new CodeGenerator(attributeGrammar.semanticRuleset);
  }

  compile(input: string): any {
    const tokens = this.lexer.tokenize(input);
    const syntaxParseTree = this.parser.parse(tokens);
    return this.codeGenerator.generate(syntaxParseTree);
  }
}
