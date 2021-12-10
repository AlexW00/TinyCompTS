import Rule from "./Rule";

export default class ProductionRule {
  ruleName: string;
  type: string;
  symbols: (Rule | string)[];
  constructor(ruleName: string, type: string, symbols: (Rule | string)[]) {
    this.ruleName = ruleName;
    this.type = type;
    this.symbols = symbols;
  }
}
