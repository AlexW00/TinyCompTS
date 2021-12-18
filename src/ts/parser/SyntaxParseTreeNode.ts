import { Symbol } from "./Symbol";
import ProductionRule from "./ProductionRule";

export default class SyntaxParseTreeNode implements Symbol {
  name: string;
  isTerminal: boolean = false;

  productionRule: ProductionRule;
  childNodes: SyntaxParseTreeNode[];

  constructor(
    productionRule: ProductionRule,
    childNodes: SyntaxParseTreeNode[]
  ) {
    this.name = productionRule.ruleName;

    this.productionRule = productionRule;
    this.childNodes = childNodes;
  }

  getLeaves(): Symbol[] {
    const value = [];
    for (const childNode of this.childNodes) {
      if (childNode.isTerminal) {
        value.push(childNode);
      } else {
        value.push(...(childNode as SyntaxParseTreeNode).getLeaves());
      }
    }
    return value;
  }
}
