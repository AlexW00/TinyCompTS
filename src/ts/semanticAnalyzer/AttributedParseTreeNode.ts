import SyntaxParseTreeNode from "../parser/SyntaxParseTreeNode";
import Token from "../lexer/Token";
import SemanticContext from "./SemanticContext";
import ProductionRule from "../parser/ProductionRule";

// Attributed abstract syntax tree
export default class AttributedParseTreeNode {
  childNodes: AttributedParseTreeNode[] = [];
  token: Token | null = null;

  attributeGrammar: any;
  semanticContext: SemanticContext;
  productionRule: ProductionRule;

  value: any;

  constructor(PST: SyntaxParseTreeNode, attributeGrammar: any) {
    this.attributeGrammar = attributeGrammar;
    if (!PST.isTerminal) this.childNodes = this.mapChildNodes(PST);
    else this.token = PST.token;
    this.productionRule = PST.productionRule;

    this.semanticContext = this.getContext();
    this.value = this.semanticContext.getAttribute("val").value();
  }

  mapChildNodes(ast: SyntaxParseTreeNode): AttributedParseTreeNode[] {
    return ast.childNodes.map((r) => {
      return new AttributedParseTreeNode(
        r as SyntaxParseTreeNode,
        this.attributeGrammar
      );
    });
  }

  getContext(): SemanticContext {
    let f: Function;

    f =
      this.attributeGrammar[this.productionRule.ruleName][
        this.productionRule.type
      ];

    if (f)
      if (this.token) return f(this.token);
      else return f(...this.childNodes.map((r) => r.getContext()));
    else
      throw new Error(
        "no semantic rule found for rule: " +
          this.productionRule.ruleName +
          " type: " +
          this.productionRule.type
      );
  }
}
