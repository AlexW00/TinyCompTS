import Token from "../lexer/Token.ts";
import ProductionRule from "./ProductionRule.ts";
import SyntaxRule from "./SyntaxRule.ts";
import { Symbol } from "./Symbol.ts";
import SyntaxParseTree from "./SyntaxParseTree.ts";
import SyntaxRuleset from "../attributeGrammar/syntaxRuleset.ts";

// ##################################################################### //
// ############################### Parser ############################## //
// ##################################################################### //

export default class Parser {
  syntaxRuleset: SyntaxRuleset;
  startSymbol: string;
  ignoreTokensNamed: string[];

  constructor(
    compiledRuleset: SyntaxRuleset,
    startSymbol: string,
    ignoreTokensNamed: string[] = []
  ) {
    this.syntaxRuleset = compiledRuleset; // the uncompiled ruleset
    this.startSymbol = startSymbol; // the symbol that the parser starts with
    this.ignoreTokensNamed = ignoreTokensNamed; // the names of the tokens that should be ignored by the parser
  }

  // parses the given tokens and returns a SyntaxParseTree if successful
  parse(tokens: Token[], startSyntaxRuleName: string): SyntaxParseTree {
    // deno-lint-ignore no-this-alias
    const context = this;
    const filteredTokens = tokens.filter(function (obj) {
      return context.ignoreTokensNamed.includes(obj.name) ? false : true;
    });
    const startSyntaxRule = new SyntaxRule(
      startSyntaxRuleName,
      this.syntaxRuleset
    );
    return new SyntaxParseTree(
      startSyntaxRule.checkProductionRules(filteredTokens)
    );
  }
}
