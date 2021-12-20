import SyntaxParseTree from "../parser/SyntaxParseTree";
import Token from "../lexer/Token";
import { AttributedSymbol } from "../parser/Symbol";
import SemanticContext from "./SemanticContext";
import ProductionRule from "../parser/ProductionRule";

// Attributed abstract syntax tree
export default class AttributedSyntaxParseTree {
  // implement AttributedSymbol interface
  value: any;

  // override AST.childNodes type
  childNodes: AttributedSyntaxParseTree[] = [];
  token: Token | null = null;

  // AAST specific attributes
  semanticContext: SemanticContext;
  attributeGrammar: any;
  productionRule: ProductionRule;

  constructor(PST: SyntaxParseTree | Token, attributeGrammar: any) {
    this.attributeGrammar = attributeGrammar;
    if (PST instanceof SyntaxParseTree)
      this.childNodes = this.mapChildNodes(PST);
    else this.token = PST;
    PST instanceof SyntaxParseTree
      ? (this.productionRule = PST.productionRule)
      : (this.productionRule = new ProductionRule("TOKEN", "_", []));

    this.semanticContext = this.getContext();
    console.log(this.semanticContext);
    this.value = this.semanticContext.getAttribute("val").value();
  }

  mapChildNodes(ast: SyntaxParseTree): AttributedSyntaxParseTree[] {
    return ast.childNodes.map((r) => {
      return new AttributedSyntaxParseTree(
        r as SyntaxParseTree,
        this.attributeGrammar
      );
    });
  }

  getContext(): SemanticContext {
    let f: Function;
    try {
      f =
        this.attributeGrammar[this.productionRule.ruleName][
          this.productionRule.type
        ];
    } catch (e) {
      console.error(this);
      console.error(e);
    }
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
