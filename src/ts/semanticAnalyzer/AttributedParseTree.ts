import SyntaxParseTree from "../parser/SyntaxParseTree";
import AttributedParseTreeNode from "./AttributedParseTreeNode";

// ====================================================== //
// ================= AttributeParseTree ================= //
// ====================================================== //

export default class AttributedParseTree {
  rootNode: AttributedParseTreeNode;

  constructor(syntaxParseTree: SyntaxParseTree, attributeGrammar: any) {
    this.rootNode = new AttributedParseTreeNode(
      syntaxParseTree.rootNode,
      attributeGrammar
    );
  }

  // Returns the value of the root node of this AttributedParseTree.
  value(): any {
    return this.rootNode.value;
  }
}
