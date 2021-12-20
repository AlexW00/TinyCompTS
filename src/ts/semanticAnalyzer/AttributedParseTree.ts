import SyntaxParseTree from "../parser/SyntaxParseTree";
import AttributedParseTreeNode from "./AttributedParseTreeNode";

// A tree consisting of attributed nodes
export default class AttributedParseTree {
  rootNode: AttributedParseTreeNode;

  constructor(syntaxParseTree: SyntaxParseTree, attributeGrammar: any) {
    this.rootNode = new AttributedParseTreeNode(
      syntaxParseTree.rootNode,
      attributeGrammar
    );
  }

  value(): any {
    return this.rootNode.value;
  }
}
