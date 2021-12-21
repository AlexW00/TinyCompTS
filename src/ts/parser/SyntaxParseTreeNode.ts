import Token from "../lexer/Token";
import ProductionRule from "./ProductionRule";
import { Symbol } from "./Symbol";

// ====================================================== //
// ================= SyntaxParseTreeNode ================ //
// ====================================================== //

export default class SyntaxParseTreeNode implements Symbol {
  // Symbol interface properties
  name: string;
  isTerminal: boolean = false;

  // SyntaxParseTreeNode properties
  productionRule: ProductionRule;
  childNodes: SyntaxParseTreeNode[];
  token: Token | null; //TODO: Remove and place inside productionRule??

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
