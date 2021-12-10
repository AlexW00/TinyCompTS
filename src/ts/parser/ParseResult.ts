import Token from "../lexer/Token";
import ProductionRule from "./ProductionRule";

export default class ParseResult {
  productionRule: ProductionRule;
  results: (Token | ParseResult)[];

  constructor(
    productionRule: ProductionRule,
    results: (Token | ParseResult)[] = []
  ) {
    this.productionRule = productionRule;
    this.results = results;
  }

  getValue(): Token[] {
    const value = [];
    for (const item of this.results) {
      if (item instanceof Token) {
        value.push(item);
      } else {
        value.push(...item.getValue());
      }
    }
    return value;
  }
}
