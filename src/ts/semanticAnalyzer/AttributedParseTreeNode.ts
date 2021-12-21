import SyntaxParseTreeNode from "../parser/SyntaxParseTreeNode";
import SemanticContext from "./SemanticContext";
import { MissingSemanticRuleError } from "./SemanticError";

export default class AttributedParseTreeNode extends SyntaxParseTreeNode {
  // override parent property
  childNodes: AttributedParseTreeNode[] = [];

  // APTRN specific properties
  attributeGrammar: any;
  semanticContext: SemanticContext;
  value: any;

  constructor(PST: SyntaxParseTreeNode, attributeGrammar: any) {
    super(PST.productionRule, PST.childNodes, PST.token);

    this.attributeGrammar = attributeGrammar;
    // if child nodes exist, map them as APTRN nodes
    if (this.childNodes) this.childNodes = this.mapChildNodes(PST);
    // generate semantic context recursively
    this.semanticContext = this.getContext();
    // finally, get the value attribute of the semantic context
    this.value = this.semanticContext.getAttribute("val").value();
  }

  mapChildNodes(SPTN: SyntaxParseTreeNode): AttributedParseTreeNode[] {
    return SPTN.childNodes.map((childNode) => {
      return new AttributedParseTreeNode(childNode, this.attributeGrammar);
    });
  }

  getContext(): SemanticContext {
    // get the semantic rule function from the attribute grammar
    let f: Function =
      this.attributeGrammar[this.productionRule.ruleName][
        this.productionRule.type
      ];
    if (f)
      if (this.token)
        // terminal node → call standard token semantic function
        return f(this.token);
      // non-terminal node → call semantic function with contexts of child nodes
      else return f(...this.childNodes.map((n) => n.getContext()));
    // if no semantic function is found, throw an error
    else throw new MissingSemanticRuleError(this.productionRule);
  }
}
