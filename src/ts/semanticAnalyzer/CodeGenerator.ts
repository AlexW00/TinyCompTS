import attributeGrammar2 from "../../config/attributeGrammar/semanticRules";
import SyntaxParseTree from "../parser/SyntaxParseTree";

import AttributedParseTree from "./AttributedParseTree";

export default class CodeGenerator {
  attributeGrammar;
  constructor(attributeGrammar: any) {
    this.attributeGrammar = attributeGrammar;
  }

  // converts a syntax parse tree to an attributed parse tree and returns the semantic value of the root node
  generate(parseResult: SyntaxParseTree) {
    const APT = new AttributedParseTree(parseResult, attributeGrammar2);
    return APT.value();
  }
}
