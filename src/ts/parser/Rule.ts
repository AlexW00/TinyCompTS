import Token from "../lexer/Token";
import { ParseEndError } from "./ParserError";
import ParseResult from "./ParseResult";
import ProductionRule from "./ProductionRule";

export default class Rule {
  name: string;
  productionRules: ProductionRule[];

  constructor(name: string, productionRules: ProductionRule[]) {
    this.name = name;
    this.productionRules = productionRules;
  }

  checkProductionRules(tokens: Token[]): ParseResult | false {
    var checkResult: ParseResult | any = null;

    for (const ruleName in this.productionRules) {
      const productionRule = this.productionRules[ruleName];
      checkResult = this.checkProductionRule(productionRule, tokens);
      if (checkResult) {
        return checkResult;
      }
    }
    return false;
  }

  checkProductionRule(
    productionRule: ProductionRule,
    tokens: Token[]
  ): ParseResult | false {
    let t = [...tokens];
    const parseResult = new ParseResult(productionRule);

    for (let i = 0; i < productionRule.symbols.length; i++) {
      const symbol = productionRule.symbols[i];
      if (symbol instanceof Rule) {
        // non terminal symbol
        const r = symbol.checkProductionRules(t);
        if (r) {
          const numRemoved = this.getArraySize(r.getValue());
          parseResult.results.push(r);
          t = t.slice(numRemoved);
        } else {
          break;
        }
      } else {
        // terminal symbol
        if (this.checkToken(t[0], symbol)) {
          const lastToken = t.shift();
          if (lastToken) {
            parseResult.results.push(lastToken);
          } else {
            throw new ParseEndError();
          }
        } else {
          // not a valid terminal symbol
          break;
        }
      }
    }
    console.log(parseResult);
    if (parseResult.results.length === productionRule.symbols.length) {
      return parseResult;
    } else return false;
  }

  checkToken = (token: Token, tokenType: string) => {
    console.log("checking token " + token.type + " against " + tokenType);
    console.log(token.type === tokenType);
    if (token.type === tokenType) return token;
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

  startsWithCapital = (word: string) => {
    return word.charAt(0) === word.charAt(0).toUpperCase();
  };

  findRule = (rule: Rule, rules: Rule[]) => {
    const result = rules.filter((obj) => {
      return obj.name == rule.name;
    });
    return result[0];
  };
}
