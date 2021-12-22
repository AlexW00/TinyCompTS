import SyntaxParseTree from "../parser/SyntaxParseTree.ts";
import AttributedParseTreeNode from "./AttributedParseTreeNode.ts";

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
