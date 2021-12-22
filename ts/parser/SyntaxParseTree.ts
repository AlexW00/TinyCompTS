import SyntaxParseTreeNode from "./SyntaxParseTreeNode.ts";

// ====================================================== //
// =================== SyntaxParseTree ================== //
// ====================================================== //

export default class SyntaxParseTree {
  rootNode: SyntaxParseTreeNode;

  constructor(rootNode: SyntaxParseTreeNode) {
    this.rootNode = rootNode;
  }

  // returns the leaves (= terminals) of this SyntaxParseTree
  getLeaves(): SyntaxParseTreeNode[] {
    return this.rootNode.getLeaves();
  }
}
