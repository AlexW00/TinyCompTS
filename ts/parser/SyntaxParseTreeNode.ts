import Token from "../lexer/Token.ts";
import ProductionRule from "./ProductionRule.ts";
import { Symbol, Quantifier } from "./Symbol.ts";

// ====================================================== //
// ================= SyntaxParseTreeNode ================ //
// ====================================================== //

export default class SyntaxParseTreeNode implements Symbol {
  // Symbol interface properties
  name: string;
  isTerminal = false;
  quantifier: Quantifier;

  // SyntaxParseTreeNode properties
  productionRule: ProductionRule; // ProductionRule that this SyntaxParseTreeNode conforms to
  childNodes: SyntaxParseTreeNode[]; // SyntaxSymbols this SyntaxParseTreeNode consists of, empty if this is a terminal
  token: Token | null; // Null if this is a non terminal, otherwise the token that this node is based on

  constructor(
    productionRule: ProductionRule,
    childNodes: SyntaxParseTreeNode[] = [],
    token: Token | null = null,
    quantifier: Quantifier
  ) {
    this.name = productionRule.ruleName;
    this.productionRule = productionRule;
    this.childNodes = childNodes;
    this.token = token;
    this.quantifier = quantifier;
    if (token) this.isTerminal = true;
  }

  // Returns all leaf nodes of this node (i.e. all nodes that have no child nodes)
  getLeaves(): SyntaxParseTreeNode[] {
    const value = [];
    for (const node of this.childNodes) {
      if (node.isTerminal) value.push(node);
      else value.push(...node.getLeaves());
    }
    return value;
  }
}
