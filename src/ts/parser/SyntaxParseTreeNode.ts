import Token from "../lexer/Token";
import ProductionRule from "./ProductionRule";
import { Symbol } from "./Symbol";

export default class SyntaxParseTreeNode implements Symbol {
  // implement Symbol interface
  name: string;
  isTerminal: boolean = false;

  // AST specific attributes
  productionRule: ProductionRule;
  childNodes: SyntaxParseTreeNode[];
  token: Token | null;

  constructor(
    productionRule: ProductionRule,
    childNodes: SyntaxParseTreeNode[] = [],
    token: Token | null = null
  ) {
    this.name = productionRule.ruleName;
    this.productionRule = productionRule;
    this.childNodes = childNodes;
    this.token = token;
    if (token) this.isTerminal = true;
  }

  getLeaves(): SyntaxParseTreeNode[] {
    const value = [];
    for (const node of this.childNodes) {
      if (node.isTerminal) value.push(node);
      else value.push(...node.getLeaves());
    }
    return value;
  }
}
