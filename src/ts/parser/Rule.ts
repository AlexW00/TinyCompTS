import Token from "../lexer/Token";
import { ParseEndError, ParseRuleError } from "./ParserError";
import AST from "./AST";
import ProductionRule from "./ProductionRule";

export default class Rule {
  name: string;
  productionRules: ProductionRule[];

  constructor(name: string, productionRules: ProductionRule[]) {
    this.name = name;
    this.productionRules = productionRules;
  }

  checkProductionRules(tokens: Token[]): AST {
    var ast: AST | any = null;
    for (const ruleName in this.productionRules) {
      ast = this.checkProductionRule(this.productionRules[ruleName], tokens);
      if (ast) return ast;
    }
    throw new ParseRuleError();
  }

  checkProductionRule(
    productionRule: ProductionRule,
    tokens: Token[]
  ): AST | false {
    let t = [...tokens];
    const ast = new AST(productionRule);

    for (let i = 0; i < productionRule.symbols.length; i++) {
      const symbol = productionRule.symbols[i];
      if (symbol instanceof Rule) {
        // non terminal symbol
        const symbolAst = symbol.checkProductionRules(t);
        if (symbolAst) {
          const numRemoved = this.getArraySize(symbolAst.getLeafNodes());
          ast.childNodes.push(symbolAst);
          t = t.slice(numRemoved);
        } else break;
      } else {
        // terminal symbol
        if (this.checkToken(t[0], symbol)) {
          const lastToken = t.shift();
          if (lastToken) {
            ast.childNodes.push(lastToken);
          } else {
            throw new ParseEndError();
          }
        } else {
          // not a valid terminal symbol
          break;
        }
      }
    }
    console.log(ast);
    if (ast.childNodes.length === productionRule.symbols.length) {
      return ast;
    } else return false;
  }

  checkNonTerminal(ast: AST, symbol: Rule, t: Token[]): Boolean {
    const symbolAst = symbol.checkProductionRules(t);
    if (symbolAst) {
      const numRemoved = this.getArraySize(symbolAst.getLeafNodes());
      ast.childNodes.push(symbolAst);
      t = t.slice(numRemoved);
      return true;
    }
    return false;
  }

  checkToken = (token: Token, tokenType: string) => {
    console.log("checking token " + token.name + " against " + tokenType);
    console.log(token.name === tokenType);
    if (token.name === tokenType) return token;
    else return null;
  };

  // returns the total amount of fields in the array
  getArraySize = (array: any[]) => {
    console.log("getting array size:" + array.length);
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      total += array[i].length || 1;
    }
    return total;
  };

  addProductionRule = (productionRule: any) => {
    this.productionRules.push(productionRule);
  };

  findRule = (rule: Rule, rules: Rule[]) => {
    const result = rules.filter((obj) => {
      return obj.name == rule.name;
    });
    return result[0];
  };
}
