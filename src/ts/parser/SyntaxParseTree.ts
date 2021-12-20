import SyntaxParseTreeNode from "./SyntaxParseTreeNode";

export default class SyntaxParseTree {
  rootNode: SyntaxParseTreeNode;

  constructor(rootNode: SyntaxParseTreeNode) {
    this.rootNode = rootNode;
  }

  getLeaves(): SyntaxParseTreeNode[] {
    return this.rootNode.getLeaves();
  }
}
