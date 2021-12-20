import attributeGrammar2 from "./semanticRules";
import SyntaxParseTree from "../parser/SyntaxParseTree";

import AttributedParseTree from "./AttributedParseTree";

export default class CodeGenerator {
  attributeGrammar;
  constructor(attributeGrammar: any) {
    this.attributeGrammar = attributeGrammar;
  }

  generate(parseResult: SyntaxParseTree) {
    console.log(parseResult);
    const APT = new AttributedParseTree(parseResult, attributeGrammar2);
    return APT.value();
  }
}
