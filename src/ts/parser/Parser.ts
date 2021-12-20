import Token from "../lexer/Token.js";
import ProductionRule from "./ProductionRule.js";
import SyntaxRule from "./SyntaxRule.js";

export default class Parser {
  grammar: any;
  compiledRule: SyntaxRule;
  startSymbol: string;
  constructor(grammar: any, startSymbol: string) {
    this.grammar = grammar;
    this.startSymbol = startSymbol;
    this.compiledRule = this.compileRuleset(this.grammar, this.startSymbol);
    console.log(this.compiledRule);
  }

  private compileRuleset(grammar: any, name: string): SyntaxRule {
    const rawRule = grammar.find((rule: any) => rule.name === name);
    return new SyntaxRule(
      name,
      Object.keys(rawRule.productionRules).map((type: any) => {
        return new ProductionRule(
          name,
          type,
          rawRule.productionRules[type].map((symbol: string) => {
            // if symbol starts with uppercase letter it is a nonterminal
            if (symbol[0] === symbol[0].toUpperCase()) {
              return this.compileRuleset(grammar, symbol);
            } else return symbol;
          })
        );
      })
    );
  }

  parse(tokens: Token[]) {
    // filter out whitespace tokens
    const filteredTokens = tokens.filter(function (obj) {
      return obj.name !== "whitespace";
    });
    const r = this.compiledRule.checkProductionRules(filteredTokens);
    return r;
  }
}
