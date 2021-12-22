import SyntaxParseTree from "../parser/SyntaxParseTree";
import AttributedParseTree from "./AttributedParseTree";

// ##################################################################### //
// ########################### CodeGenerator ########################### //
// ##################################################################### //

export default class CodeGenerator {
  attributeGrammar;
  constructor(attributeGrammar: any) {
    this.attributeGrammar = attributeGrammar; // the attribute grammar (defined in .../semanticTypes.ts)
  }

  // converts a syntax parse tree to an attributed parse tree and returns it's semantic value
  generate(parseResult: SyntaxParseTree) {
    const APT = new AttributedParseTree(parseResult, this.attributeGrammar);
    return APT.value();
  }
}
