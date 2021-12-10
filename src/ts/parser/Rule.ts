import Token from "../lexer/Token";
import { ParseEndError } from "./ParserError";
import ParseResult from "./ParseResult";

export default class Rule {
  name: string;
  productionRules: (string | Rule)[][];

  constructor(name: string, productionRules: (string | Rule)[][]) {
    this.name = name;
    this.productionRules = productionRules ?? [];
  }

  checkProductionRules(tokens: Token[]): ParseResult | false {
    var checkResult: ParseResult | any = null;

    this.productionRules.every((productionRule, i) => {
      let t = tokens;
      let res = this.checkProductionRule(productionRule, t);
      if (res) {
        checkResult = res;
        return false;
      }
      return true;
    });

    console.log(checkResult);
    if (checkResult) {
      return checkResult as ParseResult;
    } else {
      return false;
    }
  }

  checkProductionRule(
    productionRule: (string | Rule)[],
    tokens: Token[]
  ): ParseResult | false {
    let t = [...tokens];
    const parseResult = new ParseResult(this.name);

    // for each symbol in the production rule
    for (let i = 0; i < productionRule.length; i++) {
      const symbol = productionRule[i];
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
    if (parseResult.results.length === productionRule.length) {
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
