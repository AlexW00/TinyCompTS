import Token from "../lexer/Token";

export default class ParseResult {
  name: string;
  productionRule: any;
  value: (Token | ParseResult)[];

  constructor(
    name: string,
    productionRule: any,
    value: (Token | ParseResult)[] = []
  ) {
    this.name = name;
    this.productionRule = productionRule;
    this.value = value;
  }

  getValue(): any {
    this.productionRule.semanticRule(this.value);
  }
}
