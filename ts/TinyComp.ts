// deno-lint-ignore-file
// ##################################################################### //
// ############################## TinyComp ############################# //
// ##################################################################### //

import AttributeGrammar from "./attributeGrammar/attributeGrammar.ts";
import LexicalRuleset from "./attributeGrammar/lexicalRuleset.ts";
import SyntaxRuleset from "./attributeGrammar/syntaxRuleset.ts";
import SemanticRuleset from "./attributeGrammar/semanticRuleset.ts";
import Lexer from "./lexer/Lexer.ts";
import Parser from "./parser/Parser.ts";
import CodeGenerator from "./codeGenerator/CodeGenerator.ts";

// Interface that describes extra options for the compiler
interface TinyCompOptions {
  startSymbol: string; // the start symbol of the grammar (root of the syntax tree)
  ignoreTokensNamed?: string[]; // the names of the tokens that should be ignored during parsing
}

export default class TinyComp {
  lexer: Lexer;
  parser: Parser;
  codeGenerator: CodeGenerator;

  constructor(
    attributeGrammar: AttributeGrammar,
    compilerOptions: TinyCompOptions
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
export type {
  AttributeGrammar,
  LexicalRuleset,
  SyntaxRuleset,
  SemanticRuleset,
  TinyCompOptions,
};
