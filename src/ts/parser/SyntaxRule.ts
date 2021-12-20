import Token from "../lexer/Token";
import { ParseEndError, ParseRuleError } from "./ParserError";
import SyntaxParseTreeNode from "./SyntaxParseTreeNode";
import ProductionRule from "./ProductionRule";

export default class SyntaxRule {
  name: string;
  productionRules: ProductionRule[];

  constructor(name: string, productionRules: ProductionRule[]) {
    this.name = name;
    this.productionRules = productionRules;
  }

  checkProductionRules(tokens: Token[]): SyntaxParseTreeNode {
    var CPTN: SyntaxParseTreeNode | any = null;
    for (const ruleName in this.productionRules) {
      CPTN = this.checkProductionRule(this.productionRules[ruleName], tokens);
      if (CPTN) return CPTN;
    }
    throw new ParseRuleError();
  }

  private checkProductionRule(
    productionRule: ProductionRule,
    tokens: Token[]
  ): SyntaxParseTreeNode | false {
    let t = [...tokens];
    const candidateNode = new SyntaxParseTreeNode(productionRule);

    for (let i = 0; i < productionRule.symbols.length; i++) {
      // non-terminal symbol
      const symbol = productionRule.symbols[i];
      if (symbol instanceof SyntaxRule) {
        const candidateNodeChildren = symbol.checkProductionRules(t);
        if (candidateNodeChildren) {
          const numRemoved = candidateNodeChildren.getLeaves().length;
          candidateNode.childNodes.push(candidateNodeChildren);
          t = t.slice(numRemoved);
        } else break;
      } else {
        // terminal symbol
        if (t[0].name === symbol) {
          const lastToken = t.shift();
          if (lastToken) {
            candidateNode.childNodes.push(
              new SyntaxParseTreeNode(
                new ProductionRule("TOKEN", "_", []),
                [],
                lastToken
              )
            );
          } else {
            throw new ParseEndError();
          }
        } else {
          // not a valid terminal symbol
          break;
        }
      }
    }
    if (candidateNode.childNodes.length === productionRule.symbols.length) {
      return candidateNode;
    } else return false;
  }

  findRule = (rule: SyntaxRule, rules: SyntaxRule[]) => {
    const result = rules.filter((obj) => {
      return obj.name == rule.name;
    });
    return result[0];
  };
}
