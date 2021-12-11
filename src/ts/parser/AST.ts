import Token from "../lexer/Token";
import ProductionRule from "./ProductionRule";
import { Symbol } from "./Symbol";

export default class AST implements Symbol {
  // implement Symbol interface
  name: string;
  isTerminal: boolean = false;

  // AST specific attributes
  productionRule: ProductionRule;
  childNodes: Symbol[];

  constructor(productionRule: ProductionRule, childNodes: Symbol[] = []) {
    this.name = productionRule.ruleName;

    this.productionRule = productionRule;
    this.childNodes = childNodes;
  }

  getLeafNodes(): Symbol[] {
    const value = [];
    for (const item of this.childNodes) {
      if (item.isTerminal) {
        value.push(item);
      } else {
        value.push(...(item as AST).getLeafNodes());
      }
    }
    return value;
  }
}
