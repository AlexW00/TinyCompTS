import SemanticRuleset from "../attributeGrammar/semanticRuleset.ts";
import SyntaxParseTree from "../parser/SyntaxParseTree.ts";
import AttributedParseTreeNode from "./AttributedParseTreeNode.ts";

// ====================================================== //
// ================= AttributeParseTree ================= //
// ====================================================== //

export default class AttributedParseTree {
  rootNode: AttributedParseTreeNode;

  constructor(
    syntaxParseTree: SyntaxParseTree,
    semanticRuleset: SemanticRuleset
  ) {
    this.rootNode = new AttributedParseTreeNode(
      syntaxParseTree.rootNode,
      semanticRuleset
    );
  }

  // Returns the value of the root node of this AttributedParseTree.
  value(): any {
    return this.rootNode.value;
  }
}
