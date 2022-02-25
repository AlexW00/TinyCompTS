import Token from "../lexer/Token.ts";
import SyntaxRule from "./SyntaxRule.ts";
import SyntaxParseTree from "./SyntaxParseTree.ts";
import SyntaxRuleset from "../attributeGrammar/syntaxRuleset.ts";
import { LeftOverTokenError } from "./ParserError.ts";

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
  parse(
    tokens: Token[], // the tokens to be parsed
    startSyntaxRuleName: string, // the name of the start symbol
    doIgnoreLeftOverTokens = false // whether to check for left over tokens after parsing
  ): SyntaxParseTree {
    // deno-lint-ignore no-this-alias
    const context = this;
    const filteredTokens = tokens.filter(function (obj) {
      return context.ignoreTokensNamed.includes(obj.name) ? false : true;
    });
    const startSyntaxRule = new SyntaxRule(
      startSyntaxRuleName,
      this.syntaxRuleset
    );
    const syntaxParseTree = new SyntaxParseTree(
      startSyntaxRule.checkProductionRules(filteredTokens)
    );
    if (!doIgnoreLeftOverTokens)
      this._checkForLeftOverTokens(filteredTokens, syntaxParseTree);
    return syntaxParseTree;
  }

  _checkForLeftOverTokens(tokens: Token[], syntaxParseTree: SyntaxParseTree) {
    const numOfParsedTokens = syntaxParseTree.getLeaves().length;
    if (numOfParsedTokens !== tokens.length) {
      throw new LeftOverTokenError(tokens.length - numOfParsedTokens, tokens);
    }
  }
}
