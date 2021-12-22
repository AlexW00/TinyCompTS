import SyntaxParseTreeNode from "../parser/SyntaxParseTreeNode";
import SemanticContext from "./SemanticContext";
import { MissingSemanticRuleError } from "./SemanticError";
import { tokenSemanticFunction } from "../lexer/Token";

// ====================================================== //
// =============== AttributedParseTreeNode ============== //
// ====================================================== //

export default class AttributedParseTreeNode extends SyntaxParseTreeNode {
  // override parent property
  childNodes: AttributedParseTreeNode[] = [];

  // AttributedParseTreeNode specific properties
  attributeGrammar: any; // the attribute grammar used to generate this node
  semanticContext: SemanticContext; // the attributes of this node
  value: any; // the value of this node (= "val" attribute of the semantic context)

  constructor(PST: SyntaxParseTreeNode, attributeGrammar: any) {
    super(PST.productionRule, PST.childNodes, PST.token);

    this.attributeGrammar = attributeGrammar;
    if (this.childNodes) this.childNodes = this.mapChildNodes(PST); // if child nodes exist, recursively map them as APTRN nodes
    this.semanticContext = this.getContext(); // generate the semantic context recursively
    this.value = this.semanticContext.getAttribute("val").value(); // finally, get the value attribute of the semantic context
  }

  // Maps the child nodes of a SyntaxParseTreeNode to AttributedParseTreeNodes
  mapChildNodes(SPTN: SyntaxParseTreeNode): AttributedParseTreeNode[] {
    return SPTN.childNodes.map((childNode) => {
      return new AttributedParseTreeNode(childNode, this.attributeGrammar);
    });
  }

  // Returns the semantic context (= Attributes) of this node
  getContext(): SemanticContext {
    // get the corresponding semantic rule function from the attribute grammar
    let f: Function = this.getSemanticFunction();
    if (this.token)
      // is terminal node → call semantic function with the token of this node as argument
      return f(this.token);
    // is non-terminal node → call semantic function with contexts of child nodes
    else return f(...this.childNodes.map((n) => n.getContext()));
  }

  getSemanticFunction(): Function {
    if (this.token) return tokenSemanticFunction;
    else
      try {
        return this.attributeGrammar[this.productionRule.ruleName][
          this.productionRule.type
        ];
      } catch (e) {
        // if no semantic rule is found, throw an error
        throw new MissingSemanticRuleError(this.productionRule);
      }
  }
}
