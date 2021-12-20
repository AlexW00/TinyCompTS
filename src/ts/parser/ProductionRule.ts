import SyntaxRule from "./SyntaxRule";

export default class ProductionRule {
  ruleName: string;
  type: string;
  symbols: (SyntaxRule | string)[];
  constructor(
    ruleName: string,
    type: string,
    symbols: (SyntaxRule | string)[]
  ) {
    this.ruleName = ruleName;
    this.type = type;
    this.symbols = symbols;
  }
}
