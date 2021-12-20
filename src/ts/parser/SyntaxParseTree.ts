import SyntaxParseTreeNode from "./SyntaxParseTreeNode";

export default class SyntaxParseTree {
  // implement Symbol interface
  rootNode: SyntaxParseTreeNode;

  constructor(rootNode: SyntaxParseTreeNode) {
    this.rootNode = rootNode;
  }

  getLeaves(): SyntaxParseTreeNode[] {
    return this.rootNode.getLeaves();
  }
}
