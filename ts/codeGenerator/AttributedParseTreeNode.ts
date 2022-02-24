import SyntaxParseTreeNode from "../parser/SyntaxParseTreeNode.ts";
import SemanticContext from "./SemanticContext.ts";
import { MissingSemanticRuleError } from "./SemanticError.ts";
import { tokenSemanticFunction } from "../lexer/Token.ts";
import SemanticRuleset from "../attributeGrammar/semanticRuleset.ts";

// ====================================================== //
// =============== AttributedParseTreeNode ============== //
// ====================================================== //

export default class AttributedParseTreeNode extends SyntaxParseTreeNode {
  // override parent property
  childNodes: AttributedParseTreeNode[] = [];

  // AttributedParseTreeNode specific properties
  semanticRuleset: SemanticRuleset; // the attribute grammar used to generate this node
  semanticContext: SemanticContext; // the attributes of this node
  value: any; // the value of this node (= "val" attribute of the semantic context)

  constructor(PST: SyntaxParseTreeNode, semanticRuleset: SemanticRuleset) {
    super(PST.productionRule, PST.childNodes, PST.token, PST.quantifier);

    this.semanticRuleset = semanticRuleset;
    if (this.childNodes) this.childNodes = this.mapChildNodes(PST); // if child nodes exist, recursively map them as APTRN nodes
    this.semanticContext = this.getContext(); // generate the semantic context recursively
    this.value = this.semanticContext.getAttribute("val").value(); // finally, get the value attribute of the semantic context
  }

  // Maps the child nodes of a SyntaxParseTreeNode to AttributedParseTreeNodes
  mapChildNodes(SPTN: SyntaxParseTreeNode): AttributedParseTreeNode[] {
    return SPTN.childNodes.map((childNode) => {
      return new AttributedParseTreeNode(childNode, this.semanticRuleset);
    });
  }

  // Returns the semantic context (= Attributes) of this node
  getContext(): SemanticContext {
    // get the corresponding semantic rule function from the attribute grammar
    const f: Function = this.getSemanticFunction();
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
        return this.semanticRuleset[this.productionRule.ruleName][
          this.productionRule.type
        ];
        // deno-lint-ignore no-unused-vars
      } catch (e) {
        // if no semantic rule is found, throw an error
        throw new MissingSemanticRuleError(this.productionRule);
      }
  }
}
