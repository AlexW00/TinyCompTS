import SyntaxParseTreeNode from "./SyntaxParseTreeNode";

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
