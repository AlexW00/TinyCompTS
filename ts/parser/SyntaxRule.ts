import Token from "../lexer/Token.ts";
import { ParseEndError, ParseRuleError } from "./ParserError.ts";
import SyntaxParseTreeNode from "./SyntaxParseTreeNode.ts";
import ProductionRule from "./ProductionRule.ts";
import {
  Symbol,
  Quantifier,
  makeSymbol,
  getSymbolQuantifier,
  symbolIsOptional,
  symbolIsMore,
} from "./Symbol.ts";
import SyntaxRuleset from "../attributeGrammar/syntaxRuleset.ts";

// ====================================================== //
// ===================== SyntaxRule ===================== //
// ====================================================== //

export default class SyntaxRule implements Symbol {
  // symbol interface properties
  name: string;
  isTerminal = false;
  quantifier: Quantifier;

  static stack: SyntaxRule[] = [];

  syntaxRuleset: SyntaxRuleset;

  // SyntaxRule properties
  productionRules: ProductionRule[];

  constructor(name: string, syntaxRuleset: SyntaxRuleset) {
    this.name = name;
    this.syntaxRuleset = syntaxRuleset;
    this.quantifier = getSymbolQuantifier(name);
    this.productionRules = Object.keys(this.syntaxRuleset[name]).map(
      (syntaxRuleType) =>
        new ProductionRule(
          name,
          syntaxRuleType,
          this.syntaxRuleset[name][syntaxRuleType].map((symbol) => {
            return makeSymbol(symbol);
          })
        )
    );
  }

  // check whether the given tokens match one of the production rules
  checkProductionRules(tokens: Token[]): SyntaxParseTreeNode | false {
    let SPTN: SyntaxParseTreeNode | false = false;
    for (const ruleName in this.productionRules) {
      SPTN = this.checkProductionRule(this.productionRules[ruleName], tokens);
      if (SPTN) return SPTN;
    }
    return SPTN;
    //throw new ParseRuleError(tokens);
  }

  // check whether the given tokens match the given production rule
  private checkProductionRule = (
    productionRule: ProductionRule,
    tokens: Token[]
  ): SyntaxParseTreeNode | false => {
    let t = [...tokens];
    const candidateNode = new SyntaxParseTreeNode(
      productionRule,
      [],
      null,
      this.quantifier
    );

    let isOptional: boolean | null = null;
    // iterate over the production rule's syntax symbols and check whether they match the tokens
    for (let i = 0; i < productionRule.syntaxSymbols.length; i++) {
      const symbol = productionRule.syntaxSymbols[i];
      if (isOptional === null) isOptional = symbolIsOptional(symbol);

      if (!symbol.isTerminal) {
        // non-terminal symbol → recursively check its production rules
        const candidateRule = new SyntaxRule(symbol.name, this.syntaxRuleset);
        const isRecursive =
          SyntaxRule.stack.findIndex((rule) => rule.name === symbol.name) !==
          -1;
        if (isRecursive)
          throw new Error(
            "Recursion in Syntax Rule: " +
              symbol.name +
              " with stack: " +
              SyntaxRule.stack.map((rule) => rule.name).join(", ")
          );
        SyntaxRule.stack.push(candidateRule);
        const candidateNodeChildren = candidateRule.checkProductionRules(t);
        SyntaxRule.stack.pop();
        if (candidateNodeChildren) {
          const numRemoved = candidateNodeChildren.getLeaves().length;
          candidateNode.childNodes.push(candidateNodeChildren);
          t = t.slice(numRemoved);

          if (symbolIsMore(symbol)) {
            i--;
            isOptional = true;
            continue;
          }
        } else if (!isOptional) return false;
      } else {
        // terminal symbol → check if the next token matches the terminal symbol
        if (t[0].name === symbol.name) {
          const lastToken = t.shift();
          if (lastToken) {
            candidateNode.childNodes.push(
              new SyntaxParseTreeNode(
                new ProductionRule("TOKEN", "_", []),
                [],
                lastToken,
                lastToken.quantifier
              )
            );
            if (symbolIsMore(symbol)) {
              i--;
              isOptional = true;
              continue;
            }
          } else throw new ParseEndError();
        } else if (!isOptional) return false;
      }
      isOptional = null;
    }

    return candidateNode;
  };

  // Returns the first SyntaxRule from rules, that matches rule.name
  findRule = (rule: SyntaxRule, rules: SyntaxRule[]): SyntaxRule => {
    const result = rules.filter((r) => {
      return r.name == rule.name;
    });
    return result[0];
  };
}
